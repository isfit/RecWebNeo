import React from "react";
import ApplicationsModule from "../components/applicationsModule";
import PageLayout from './pageLayout';
import PositionChoiceBoxReadOnly from "../components/positionChoiceBoxReadOnly"
import { useQuery } from "@apollo/client";
import {APPLICATIONS} from '../requests/applicationRequests';
import ErrorPage from './errorPage';

const ApplicationRow = ({applicationData}) => {

  const positions = applicationData.positions.map(x => x.value);

  return (
  <div className="card py-2 px-2 mb-3">
      <div className="flex-grid">
        <div className="col-list w-100" style={{display:"flex"}}>
          <h4> { applicationData.applicant.firstName } { applicationData.applicant.lastName } </h4>
          <strong className="text-muted">Email: { applicationData?.applicant?.email }</strong>
          <strong className="text-muted">Phone Number: {applicationData?.applicant?.phoneNumber} </strong>
          <small><br></br> { applicationData.applicationText } </small>
          <div className="flex-grid border-top mt-2 pt-2">
            <div className="col">
              <div className="flex-grid col-list mt-3">
                <div>
                  <input type="checkbox" checked={ applicationData.prioritized } readOnly={true}/>
                  <small className="ml-2">The positions in my application are prioritized</small>
                </div>
                <div>
                  <input type="radio" checked={ applicationData.interest === "OnlyPositions" } readOnly={true} />
                  <small className="ml-2">I am only interested in the positions I have entered</small>
                </div>
                <div>
                  <input type="radio" checked={ applicationData.interest === "Same" } readOnly={true} />
                  <small className="ml-2">I am open to other postions within the same genre of the positions I have entered</small>
                </div>
                <div> 
                  <input type="radio" checked={ applicationData.interest === "open" } readOnly={true} />
                  <small className="ml-2">I am open to any other position in ISFiT, regardless of the positions I have entered</small>
                </div>
              </div>
            </div>
            <div className="col">
              <PositionChoiceBoxReadOnly positions={ positions } style={{ float:"right"}}/>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

const ApplicationPage = () => {

  const { data, error, loading} = useQuery(APPLICATIONS);
  
  console.log(data, error, loading);

  if (loading) {
    return(
      <div>
        Loading
      </div>
    )
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <PageLayout>
      <div className="container pt-4">
        <h4 className="mb-4">View Applications</h4>
        
        {
          data?.applications.nodes?.map(application => {
            return(<ApplicationRow applicationData={application} />)
          })
        }

      </div>
    </PageLayout>
  );
};

export default ApplicationPage;
