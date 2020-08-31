import React, { useState } from "react";
import ApplicationsModule from "../components/applicationsModule";
import PageLayout from './pageLayout';
import PositionChoiceBoxReadOnly from "../components/positionChoiceBoxReadOnly"
import { useQuery } from "@apollo/client";
import {APPLICATIONS} from '../requests/applicationRequests';
import ErrorPage from './errorPage';

import { GET_SECTIONS } from "../requests/userRequests";
import { POSITIONS } from "../requests/positionRequests";



const getSectionFromID = (sectionsData, sectionId) => {
  let sectionsArray = sectionsData?.sections ?? [];
  let sectionObject = null;

  sectionsArray.map( section => {
      if (section.id === sectionId) {
          sectionObject = section
      }
  })

  return sectionObject ?? {teams:[]}
};


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
  
  const sectionsData = useQuery(GET_SECTIONS);
  const applicationsData = useQuery(APPLICATIONS);
  const positionsData = useQuery(POSITIONS);
  

  const [chosenSection, setChosenSection] = useState("");
  const [chosenTeam, setChosenTeam] = useState(null);
  const [chosenPosition, setChosenPosition] = useState(null);


  const applyFilters = (applications) => {
    let resultList = [];

    let hasChosenSection = Boolean(chosenSection);
    let hasChosenTeam = Boolean(chosenTeam);
    let hasChosenPosition = Boolean(chosenPosition);

    console.log("Section chosen? ", hasChosenSection)
    console.log("Team chosen? ", hasChosenTeam)
    console.log("Position chosen? ", hasChosenPosition)

    if (!hasChosenSection && !hasChosenTeam && !hasChosenPosition ){ //Has not chosen neither section, team or position
      console.log("NUM ALL APPLICATIONS: ", [...applications].length)
      return [...applications]
    }

    resultList = applications.filter(function(application) {
      for (var i = 0; i < application.positions.length; i++) {
        if (application.positions[i].value.section.id === chosenSection){
          return true;
        }
      }
      return false;
    });
    console.log("NUM RESULTS: ", resultList)
    /* if (hasChosenSection) {
      applications.map(application => {
        for (var i = 0; i < application.positions.length; i++) {
          if (application.positions[i].value.section.id === chosenSection) {
            resultList.push(application)
            break;
          }
        }
      })
    } */

    return(
        resultList
    );
  };



  if (applicationsData.loading) {
    return(
      <PageLayout>
        Loading
      </PageLayout>
    )
  }

  if (applicationsData.error) {
    return <ErrorPage />
  }

  return (
    <PageLayout>
      <div className="container pt-4">
        <h4 className="mb-4">View Applications</h4>
          <div className="flex-grid-adaptive">
            <div className="col pl-0" style={{flexBasis:"20%"}}>
              <div className="card py-2 px-2 mb-3">
                <h6>Filters</h6>
                <small>Section</small>
                <form action="">
                  <select className="w-100" id="sections" name="sections" onChange={(e) => { setChosenSection(e.target.value) }}>
                      <option value={""}>{"All"}</option>
                      {sectionsData?.data?.sections.map( section => {
                        return (
                            <option value={section.id}>{section.name}</option>
                        )
                      })}
                  </select>
                </form>
                <small>Team</small>
                  <form action="">
                    <select className="w-100" id="teams" name="teams" onChange={(e) => { setChosenTeam(e.target.value) }} >
                        <option value={null}>{"All"}</option>
                        {getSectionFromID(sectionsData?.data, chosenSection).teams?.map( team => {
                            return (
                                <option value={team.id}>{team.name}</option>
                            )
                            })}
                    </select>
                  </form>
                <small>Position</small>
                <form action="">
                  <select className="w-100" id="positions" name="positions" onChange={(e) => { setChosenPosition(e.target.value) }} >
                      <option value={null}>{"none"}</option>
                      {positionsData?.data?.positions.nodes.map( position => {
                          return (
                              <option value={position.id}>{position.name}</option>
                          )
                          })}
                  </select>
                </form>
              </div>
            </div>
            <div className="col pl-0" style={{flexBasis:"80%"}}>
            {
              applyFilters(applicationsData?.data?.applications?.nodes).map(application => {
                return(<ApplicationRow applicationData={application} />)
              })
            }
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApplicationPage;
