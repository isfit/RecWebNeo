import React from "react";
import PageLayout from './pageLayout';
import AvailableTimesFom from '../components/availableTimesForm';
import ErrorPage from './errorPage';

import { APPLY, EDIT_USER_INFORMATION, ME_BUSY_TIMES} from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const UnavailableTimesPage = (props) => {

  const [editUserInformation, { data, error, loading }] = useMutation(EDIT_USER_INFORMATION);
  const busyTimes = useQuery(ME_BUSY_TIMES);

  console.log(error);

  const getBusyTimes = () => {
      const busy = busyTimes.data?.me.busyTime;
      //const busy = JSON.parse(localStorage.getItem("busyTimes") || "[]");
      console.log("Buuusy", busy)
      //let busyTime = [];
      //busy.map(x => busyTime.push(new Date(x)));
      return busy;
  };
  //const variableData = (busyTimesArray) => {
    //variables: {
      //    "input": {
      //    "busyTime": busyTimesArray
     // }
   // }
 // };

  const submitUnavailableTimes = () => {
      let busyTimesData = getBusyTimes();
      editUserInformation({variables: {"input": {"busyTime": busyTimesData}}});
    };

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <PageLayout>
      <div className="container">
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Enter the hours you are busy</h4>
        </div>
        
        <AvailableTimesFom 
        data = {
            {hours: "everyHour",
            busyTimes: getBusyTimes()
        }

        }
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