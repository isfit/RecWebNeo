import React from "react";
import PageLayout from './pageLayout';
import AvailableTimesForm from '../components/availableTimesForm';
import ErrorPage from './errorPage';

import { APPLY } from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const AvailableTimesPage = (props) => {

  const [updateRegistration, { data, error, loading }] = useMutation(APPLY, {
    onError: () => {},
  });

  const startInterview = new Date("2020-08-27T00:00:00.000Z");
  const endInterview = new Date("2020-09-10T00:00:00.000Z");


  const updateStoredBusyTimes = (busy) => {
    localStorage.setItem("busyTimes", JSON.stringify(busy));
  }

  const getBusyTimes = () => {
      const busy = JSON.parse(localStorage.getItem("busyTimes") || "[]");
      let busyTime = [];
      busy.map(x => busyTime.push(new Date(x)));
      return busy;
  };

  const getPositions = () => {
    const positions = JSON.parse(localStorage.getItem('applicationPositions') || "[]");
    const positionInput = [];
    for (let i = 0; i < positions.length; i++) {
      const pos = {key: i.toString(), value: positions[i].id};
      positionInput.push(pos);
    }
    return positionInput;
  };

  const variableData = {
    variables: {
      input: {
        admissionPeriode: "5f396eebd2042f000149a790",
        applicationText: localStorage.getItem("applicationText") || "",
        available: getBusyTimes(),
        interest: localStorage.getItem("otherPositions") || "OnlyPositions",
        positions: getPositions(),
        preferDigital: true,
        prioritized: localStorage.getItem("prioritized") === 'true',
      }
    }
  };

  const submitApplication = () => {
    console.log("These are the saved times:", getBusyTimes());
      updateRegistration(variableData);
    };

  if (loading) {
    return (
      <div>Loading</div>
    )
  }


  if (data != null ){
    return (
      <PageLayout>
        <span>Application entered successfully. Thank you!</span>
      </PageLayout>
    );
  };

  if (error?.message == "There already exists an application for this user for this application periode.") {
    return (
        <PageLayout>
          <span>There already exists an application for this user. Go to my application to see it.</span>
        </PageLayout>

    );
  };

  if (error?.message == "There must be at least 1 and at most 3 positions connected to an application") {
    return (
        <PageLayout>
          <span>There must be at least 1 and at most 3 positions connected to an application</span>
        </PageLayout>

    );
  };

  if (error != null) {
    return (
      <PageLayout>
        <ErrorPage 
          errorMessage={"The current user is not authorized to access this resource."}
          errorType={"AuthenticationError"}
          refetch={() => updateRegistration(variableData)}
        />
      </PageLayout>
    )
  }



  return (
    <PageLayout>
      <div className="container">
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Enter the hours you are busy</h4>
        </div>
        
        <AvailableTimesForm 
          busyTimes={getBusyTimes() ?? []}
          setBusyTimes={busy => {
            updateStoredBusyTimes(busy)
          }}
          startDate = {startInterview}
          endDate = {endInterview}
          hourDiff={2}
          firstTimeSlot={8}
          lastTimeSlot={20}
          readOnly = { false }
         />

        <div className="row">
          <div className="col mb-3">
            <a
              type="button"
              className="btn btn-outline-secondary float-left"
              href="/enterapplication"
            >
              Back
            </a>
            <a
              type="button"
              className="btn btn-continue float-right"
              onClick={() => submitApplication()}
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AvailableTimesPage;
