import React, { useState, useEffect, useRef } from "react";
import PageLayout from './pageLayout';
import PositionChoiceBoxSimple from "../components/positionChoiceBoxSimple"
import { useQuery } from "@apollo/client";
import {APPLICATIONS} from '../requests/applicationRequests';
import ErrorPage from './errorPage';
import ScrollList from '../components/scrollList';
import Loading from '../components/loadingSpinner';



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
  <div className="card py-2 px-2 mb-4" style={{borderColor:"#40B4A3"}}>
      <div className="flex-grid">
        <div className="col-list w-100" style={{display:"flex"}}>
          <div className="flex-grid" style={{justifyContent:"space-between"}}>
            <h4> { applicationData.applicant.firstName } { applicationData.applicant.lastName } </h4>
            <h5 className="text-muted">{ applicationData?.applicant?.email }</h5>
            <h5 className="text-muted">{applicationData?.applicant?.phoneNumber} </h5>
          </div>
          <small><br></br> { applicationData.applicationText } </small>
          <div className="flex-grid border-top mt-2 pt-2">
            <div className="col pr-0"  style={{flex:"1 1 0"}}>
              {applicationData?.positions?.map( position => {
                  return(
                      <div className="flex-grid">
                          <div className="col pl-0" style={{display:"flex", flexBasis:"5%"}}>
                              <h1 className="mb-0">{Number(position.key)+1}</h1>
                          </div>
                          <div className="col" style={{display:"flex", flexBasis:"95%", flexDirection:"column"}}>
                              <p className="mb-0 mt-1">{position.value.name}</p>
                              <small>{position.value.section.name}: {position.value.team.name}</small>
                          </div>
                      </div>
                  )
                  }
              )}
            </div>
            <div className="col pl-0" style={{flex:"1 1 0", flexDirection:"column"}}>
                <div className="flex-grid mb-3">
                    <input type="checkbox" checked={applicationData.prioritized} />
                    <small className="page-title pl-2 mb-0">The positions in my application are prioritized</small>
                </div>
                <div className="flex-grid">
                    <input type="radio" checked={applicationData.interest === "OnlyPositions"} />
                    <small className="page-title ml-2 mb-0">I am only interested in the positions I have entered</small>
                </div>
                <div className="flex-grid mt-2">
                    <input type="radio" checked={applicationData.interest === "Same"} />
                    <small className="page-title ml-2 mb-0">I am open to other postions within the same genre of the positions I have entered</small>
                </div>
                <div className="flex-grid mt-2">
                    <input type="radio" checked={applicationData.interest.toLowerCase() === "open"} />
                    <small className="page-title ml-2 mb-0">I am open to any other position in ISFiT, regardless of the positions I have entered</small>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

const ApplicationPage = () => {
  
  const sectionsData = useQuery(GET_SECTIONS);
  const applicationsData = useQuery(APPLICATIONS, {fetchPolicy: "no-cache"});
  const positionsData = useQuery(POSITIONS);
  

  const [chosenSection, setChosenSection] = useState("");
  const [chosenTeam, setChosenTeam] = useState("");
  const [chosenPosition, setChosenPosition] = useState("");

  let applications = applicationsData?.data?.applications?.nodes ?? [];
  let positions = positionsData?.data?.positions?.nodes ?? [];

  const positionRef= useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {                                                                     //If you choose a new section, reset both chosen team and position
    Boolean(positionRef?.current?.value) ? positionRef.current.click() : console.log();
    Boolean(teamRef?.current?.value) ? teamRef.current.click() : console.log();
  }, [chosenSection]);

  useEffect(() => {                                                                    //If you choose a new team, reset chosen position
    Boolean(positionRef?.current?.value) ? positionRef.current.click() : console.log();
  }, [chosenTeam]);


  const ApplyFilters = (applications) => {
    let resultList = [...applications];

    let hasChosenSection = Boolean(chosenSection);
    let hasChosenTeam = Boolean(chosenTeam);
    let hasChosenPosition = Boolean(chosenPosition);

    if (hasChosenSection) {
      resultList = resultList.filter(function(application) {
        for (var i = 0; i < application.positions.length; i++) {
          if (application.positions[i].value.section.id === chosenSection){
            return true;
          }
        }
        return false;
      });
    }

    if (hasChosenTeam) {
      resultList = resultList.filter(function(application) {
        for (var i = 0; i < application.positions.length; i++) {
          if (application.positions[i].value.team.id === chosenTeam){
            return true;
          }
        }
        return false;
      });
    }

    if (hasChosenPosition){
      resultList = resultList.filter(function(application) {
        for (var i = 0; i < application.positions.length; i++) {
          if (application.positions[i].value.id === chosenPosition){
            return true;
          }
        }
        return false;
      }
    )}

    return(
        [resultList, resultList.length]
    );
  };



  const filterPositionsResults = (positions) => {
    let resultList = [...positions];

    if (Boolean(chosenSection)) {
      resultList = resultList.filter(function(position) {
          return position.section.id === chosenSection
      });
    }

    if (Boolean(chosenTeam)) {
      resultList = resultList.filter(function(position) {
          return position.team.id === chosenTeam
      });
    }

    return (
      resultList
    )
  }

 /*  if (applicationsData.loading) {
    return(
      <PageLayout>
        Loading
      </PageLayout>
    )
  } */

  if (applicationsData.error) {
    return <ErrorPage />
  }

  return (
    <PageLayout>
      <div className="container pt-4">
          <div className="flex-grid-adaptive">
            <div className="col pl-0" style={{flexBasis:"20%"}}>
              <div className="card py-2 px-2 mb-3" style={{borderColor:"#40B4A3"}}>
                <h6>Filters</h6>
                <small>Section</small>
                <form action="">
                  <select className="w-100" id="sections" name="sections" onChange={(e) => setChosenSection(e.target.value) }>
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
                    <select className="w-100" id="teams" name="teams" onChange={(e) => setChosenTeam(e.target.value) } >
                        <option value={""}>{"All"}</option>
                        {getSectionFromID(sectionsData?.data, chosenSection).teams?.map( team => {
                            return (
                                <option value={team.id}>{team.name}</option>
                            )
                            })}
                    </select>
                      <input type="reset" value="NewSectionResetTeam" ref={teamRef} onClick={() => setChosenTeam("")} style={{display:"none"}}/>
                  </form>
                <small>Position</small>
                <form action="">
                  <select className="w-100" id="positions" name="positions" onChange={(e) => setChosenPosition(e.target.value) } >
                      <option value={""}>{"All"}</option>
                      {filterPositionsResults(positions).map( position => {
                          return (
                              <option value={position.id}>{position.name}</option>
                          )
                      })}
                  </select>
                      <input type="reset" value="NewSectionResetPositions" ref={positionRef} onClick={() => setChosenPosition("")} style={{display:"none"}}/>
                </form>
                <small className="mt-2" style={{textAlign:"center"}}>Number of applications matching your filters:</small>
                { applicationsData.loading ?
                  <div className="flex-grid" style={{justifyContent:"center"}}>
                    <div class="spinner-border spinner-border-sm" role="status" style={{color:"#1bae91"}}>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  :
                  <h5 style={{textAlign:"center"}}>{ApplyFilters(applications)[1]} </h5>
                }
                <small className="mt-2" style={{textAlign:"center"}}>Please note that unless you are an administrator, you can only see the applications that includes a position associated with your team. If you are not yet associated with a team, you will not be able to see any applications.</small>
              </div>
            </div>
            <div className="col pl-0" style={{flexBasis:"80%"}}>
              <div className="card w-100 h-100 px-3 py-3">
                <ScrollList minHeight="700px" >
                <h4 className="mb-3 pb-1">Applications</h4>
                {applicationsData.loading ? <div className="mt-5"><Loading loading={true}/></div> : null}
                {
                  ApplyFilters(applications)[0].map(application => {
                    return(<ApplicationRow applicationData={application} />)
                  })
                }
                </ScrollList>
              </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApplicationPage;
