import React, {useState, useEffect} from "react";
import PageLayout from './pageLayout';
import AvailableTimesFormSimple from '../components/availableTimesFormSimple';
import ErrorPage from './errorPage';
import { GET_ADMISSION_PERIODS } from  "../requests/orgRequests";

import { APPLY, EDIT_USER_INFORMATION, ME_BUSY_TIMES} from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const UnavailableTimesPage = (props) => {

  const [editUserInformation] = useMutation(EDIT_USER_INFORMATION, {
    onError: () => {alert("Something went wrong when trying to update your schedule")},
    onCompleted: () => {alert("Your schedule is now updated!")}
  });

  const {data, error, loading} = useQuery(ME_BUSY_TIMES, {fetchPolicy: "no-cache"});
  
  
  const admissionPeriodData = useQuery(GET_ADMISSION_PERIODS);
  let admissionPeriod = admissionPeriodData?.data?.admisionPeriodes[0] ?? [];
  
  const startInterview = new Date(admissionPeriod.startInterviewDate);
  const endInterview = new Date(admissionPeriod.endInterviewDate);

  
  const [updatedBusyTimes, setUpdatedBusyTimes] = useState([]);

  // Loading sceen while loading new data!
  if (error) {
    return (
      <PageLayout>
        <div className="container" style={{textAlign:"center"}}>
          <p>Error: Could not fetch your unavailable hours.</p>
          <p>Please contact the recruitment web team through or.it.recruitmentweb@isfit.no or other channels</p>
        </div>
      </PageLayout>
    )
  }


  const submitUnavailableTimes = () => {
      editUserInformation({variables: {"input": {"busyTime": updatedBusyTimes}}});
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Enter the hours you are busy</h4>
        </div>
        

        <AvailableTimesFormSimple
          busyTimes={data?.me?.busyTime ?? []}
          setBusyTimes={(busy) => {
            setUpdatedBusyTimes(busy);
          }}
          startDate = {startInterview}
          endDate = {endInterview}
          hourDiff={1}
          firstTimeSlot={8}
          lastTimeSlot={22}
          readOnly ={false}
         />

        <div className="row">
          <div className="col mb-3">
            <a
              type="button"
              className="btn btn-continue float-right"
              onClick={() => submitUnavailableTimes()}
            >
              Save
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UnavailableTimesPage;