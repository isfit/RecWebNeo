import React, { useState } from "react";
import PageLayout from './pageLayout';
import AvailableTimesFom from '../components/availableTimesForm';


import "../stylesheets/pages/table.css";

import { APPLY } from "../requests/userRequests";
import { useQuery, useMutation } from "@apollo/client";


const AvailableTimesPage = (props) => {

  const [updateRegistration, { data, error, loading }] = useMutation(APPLY, {
    onError: () => {},
  });

  const submitApplication = () => {
    console.log("Submiting");
  }

  return (
    <PageLayout>
      <div className="container">
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Enter the hours you are busy</h4>
        </div>
        
        <AvailableTimesFom />

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
              className="btn btn-outline-success float-right"
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
