import React, {useState} from "react";
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
  const [updatedBusyTimes, setUpdatedBusyTimes] = useState(data?.me.busyTime ?? []);
  
  const admissionPeriodData = useQuery(GET_ADMISSION_PERIODS);
  let admissionPeriod = admissionPeriodData?.data?.admisionPeriodes[0] ?? [];

  const startInterview = new Date(admissionPeriod.startInterviewDate);
  const endInterview = new Date(admissionPeriod.endInterviewDate);
  

  // Loading sceen while loading new data!
  if (loading) {
    return(
      <div>
        Loading
      </div>
    )
  }

  if (error) {
    return (
      <div>
        There occured an error. Please contact the Recruitment web team, to see whan can be done.
      </div>
    )
  }


  const submitUnavailableTimes = () => {
      editUserInformation({variables: {"input": {"busyTime": updatedBusyTimes == null || updatedBusyTimes.length == 0 ? data?.me.busyTime ?? [] : updatedBusyTimes }}});
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Enter the hours you are busy</h4>
        </div>
        

        <AvailableTimesFormSimple
          busyTimes={data?.me.busyTime ?? []}
          setBusyTimes={busy => {setUpdatedBusyTimes(busy)}}
          startDate = {startInterview}
          endDate = {endInterview}
          hourDiff={1}
          firstTimeSlot={8}
          lastTimeSlot={22}
          readOnly = { false }
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