import React from "react";
import PageLayout from './pageLayout';
import AvailableTimesFom from '../components/availableTimesForm';
import ErrorPage from './errorPage';

import { APPLY, EDIT_USER_INFORMATION, ME_BUSY_TIMES} from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const UnavailableTimesPage = (props) => {

  const [editUserInformation, { data, error, loading }] = useMutation(EDIT_USER_INFORMATION);
  const {busyTimesData, busyTimesError, busyTimesLoading} = useQuery(ME_BUSY_TIMES);
  const [busyTimes, setBusyTimes] = useState(data ?? ( busyTimesData ?? [] ));

  // Loading sceen while loading new data!
  if (busyTimesLoading) {
    return(
      <div>
        Loading
      </div>
    )
  }

  if (error || busyTimesError) {
    return (
      <div>
        There occured an error. Please contact the Recruitment web team, to see whan can be done.
      </div>
    )
  }



  const submitUnavailableTimes = () => {
      editUserInformation({variables: {"input": {"busyTime": busyTimes}}});
  };

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