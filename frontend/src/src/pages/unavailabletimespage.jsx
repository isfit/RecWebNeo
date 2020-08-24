import React from "react";
import PageLayout from './pageLayout';
import AvailableTimesFom from '../components/availableTimesForm';
import ErrorPage from './errorPage';

import { APPLY } from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const UnavailableTimesPage = (props) => {

  const [updateRegistration, { data, error, loading }] = useMutation(APPLY, {
    onError: () => {},
  });

  console.log(error);

  const getBusyTimes = () => {
      const busy = JSON.parse(localStorage.getItem("busyTimes") || "[]");
      let busyTime = [];
      busy.map(x => busyTime.push(new Date(x)));
      return busy;
  };

  const variableData = {
    variables: {
      input: {
        available: getBusyTimes(),
      }
    }
  };

  const submitUnavailableTimes = () => {
      updateRegistration(variableData);
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
        hours = "everyHour" />

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