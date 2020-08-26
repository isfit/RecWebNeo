import React, {useState} from "react";
import PageLayout from './pageLayout';
import AvailableTimesFormSimple from '../components/availableTimesFormSimple';
import ErrorPage from './errorPage';

import { APPLY, EDIT_USER_INFORMATION, ME_BUSY_TIMES} from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const UnavailableTimesPage = (props) => {

  const [editUserInformation] = useMutation(EDIT_USER_INFORMATION);

  const {data, error, loading} = useQuery(ME_BUSY_TIMES, {fetchPolicy: "no-cache"});
  const [updatedBusyTimes, setUpdatedBusyTimes] = useState(data?.me.busyTime ?? []);
  const startInterview = new Date("2020-08-27T00:00:00.000Z");
  const endInterview = new Date("2020-09-10T00:00:00.000Z");

  /* console.log("UPDATEDBUSYTIMES", updatedBusyTimes); */

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
          setBusyTimes={busy => {
            setUpdatedBusyTimes(busy);
          }}
          startDate = {startInterview}
          endDate = {endInterview}
          hourDiff={1}
          firstTimeSlot={8}
          lastTimeSlot={20}
          readOnly = { false }
          selectable = { true }
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