import React, {useState, useEffect} from "react";
import PageLayout from './pageLayout';
import { connect } from "react-redux";

import Loading from '../components/loadingSpinner';

import { useQuery, useMutation } from "@apollo/client";

import { ALL_INTERVIEWS, DELETE_INTERVIEW, SET_INTERVIEW_STATUS, ALL_INTERVIEWS_SEARCH  } from "../requests/interviewRequests";
import { GET_SECTIONS } from "../requests/userRequests";
import { POSITIONS } from "../requests/positionRequests";

import { getUserAuthKey } from "../redux/selectors";

import { getRolesFromToken, getAccessLevel } from "../components/navbar/navbarHelperFunctions";
import { InterviewFilteringFunction } from "../components/filtering/SectionTeamFilteringFunction";

import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import ScrollList from '../components/scrollList';
import FilterBox from "../components/filtering/filterBox";

import gql from 'graphql-tag'


const InterviewCard = (props) => {
    const datTime = new Date(props.startTime);

        return (
        <div className="card mb-2 px-3 py-2 w-100">
            <div className="flex-grid" style={{justifyContent:"space-between", alignItems: "center"}}>
                <h1 className="my-1">{props.applicant.firstName} {props.applicant.lastName}</h1>
                {props.children}
            </div>
            <div className="flex-grid w-100 mb-1">
                <div className="col pl-0" style={{display:"flex", flexBasis:"50%", flexDirection:"column" }}>
                    <h3 className="mb-0">{datTime.toDateString()} {datTime.toTimeString().slice(0,2)}:15</h3>
                    <p className="text-muted mb-0">{props.applicant.email}</p>
                    { Boolean(props.applicant.phoneNumber) ? <p className="text-muted mb-0">{props.applicant.phoneNumber}</p> : <p className="text-muted mb-0">No phonenumber registered</p>}
                    {props.positions.map( position => {
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
                <div className="col" style={{display:"flex", flexBasis:"50%", flexDirection:"column", textAlign:"right"}}>
                    <h5 className="mt-2">Interviewers</h5>
                        { props.interviewers.map( interviewer => {
                            return(
                                <div>
                                    <p className="mb-0 mt-1">{interviewer.user.firstName} {interviewer.user.lastName}</p>
                                    <p className="text-muted" style={{fontSize:"15px"}}>{interviewer.user.email}</p>
                                </div>
                            )

                            })
                        }
                </div>
            </div>
            <Accordion defaultActiveKey="0">
              <Card style={{textAlign:"center"}}>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <a>Show application text</a>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body><p>{props.applicationText}</p></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
        </div>
    );
};




const AllInterviewsPage = ({userAuthKey}) => {
    const RolesArray = getRolesFromToken(userAuthKey);
    const AccessLevel = getAccessLevel(RolesArray);


    let interviewStatuses = ["Not assigned", "Invitation sent","Confirmed","Interviewed"];
    
    //QUERIES
    const allIntervewsQuery = useQuery(ALL_INTERVIEWS_SEARCH);
    const sectionsData = useQuery(GET_SECTIONS);
    const positionsData = useQuery(POSITIONS);
    const allInterviews = allIntervewsQuery?.data?.interviews?.nodes ?? [];
    let positions = positionsData?.data?.positions?.nodes ?? [];

    //MUTATIONS
    const [deleteInterviewMutation, deleteInterviewMutationData] = useMutation(DELETE_INTERVIEW);
    const [setInterviewStatusMutation] = useMutation(SET_INTERVIEW_STATUS);

    //HOOKS
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [chosenInterviewStatus, setChosenInterviewStatus] = useState("Not assigned");
    const [chosenSection, setChosenSection] = useState("");
    const [chosenTeam, setChosenTeam] = useState("");
    const [chosenPosition, setChosenPosition] = useState("");
    const [chosenInterviewStatusFilter, setChosenInterviewStatusFilter] = useState("");

    
    //FUNCTIONS
    const deleteInterview = (interviewId) => { 
        deleteInterviewMutation({variables: {input: {id: interviewId}}});
        setDeleteConfirm(false)
    };

    const setInterviewStatus = (intId, status) => {
        setInterviewStatusMutation({variables: {interviewId: intId, interviewStatus: status }});
    };

    const [searchTerm, setSearchTerm] = useState("");

    return(
        <PageLayout>
            <div className="container pt-4">
                <h4 className="mb-4">All interviews</h4>
                <div className="flex-grid-adaptive">
                    <div className="col pl-0" style={{flexBasis:"20%"}}>
                        <FilterBox sections={sectionsData?.data} positions={positions} chosenSection={chosenSection} setChosenSection={setChosenSection} chosenTeam={chosenTeam} setChosenTeam={setChosenTeam} chosenPosition={chosenPosition} setChosenPosition={setChosenPosition} setSearchTerm={setSearchTerm}>
                            <div>
                                <small className="mt-2">Status</small>
                                <form action="">
                                    <select className="w-100" id="filterStatus" name="filterStatus" onChange={(e) => {setChosenInterviewStatusFilter(e.target.value)}}>
                                        <option value={""}>All</option>
                                        {interviewStatuses.map( status => {
                                              return (
                                                  <option value={status}>{status}</option>
                                              )
                                          })}
                                    </select>
                                </form>
                                
                            </div>
                        </FilterBox>
                    </div>
                    <div className="col pl-0" style={{flexBasis:"80%"}}>
                        <div className="card py-3 px-5 mb-2 w-100">
                            { allIntervewsQuery.loading ? <Loading loading={true}/> : null}
                            <ScrollList minHeight="700px">
                            {InterviewFilteringFunction({allInterviews, chosenSection, chosenTeam, chosenPosition, chosenInterviewStatusFilter, searchTerm})[0].map( interview => {
                                return (
                                    <InterviewCard 
                                        startTime = {interview.start}
                                        applicant = {interview.applicant.user}
                                        positions = {interview.application.positions}
                                        applicationText = {interview.application.applicationText}
                                        interviewers = {interview.interviewers}
                                    >   <small>Status: {interview.status ?? "not assigned"}</small>
                                        <div className="flex-grid" style={{alignItems: "center", justifyContent: "center"}}>
                                            <form action="">
                                                <select className="w-100" id="status" name="status" onChange={(e) => {setChosenInterviewStatus(e.target.value)}}>
                                                    {interviewStatuses.map( status => {
                                                        return (
                                                            <option value={status}>{status}</option>
                                                        )
                                                    })}
                                                </select>
                                            </form>
                                            <div><button className="btn btn-secondary ml-1 py-1 px-1" onClick={event => setInterviewStatus(interview.id, chosenInterviewStatus)}>Set Status</button></div>
                                        </div>
                                        {(AccessLevel>2) ? deleteConfirm ? <div><button className="btn btn-secondary mr-1" onClick={() => setDeleteConfirm(false)}>Cancel</button><button className="btn btn-danger" onClick={() => deleteInterview(interview.id)}>DELETE</button></div> : <div className="ml-5"><button className="btn btn-danger" onClick={() => setDeleteConfirm(true)}>Delete</button></div> : null}

                                    </InterviewCard>
                                )
                            }
                            )}
                            </ScrollList>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};


const mapStateToProps = state => {
    return {
      userAuthKey: getUserAuthKey(state)
    };
};

/* export default AllInterviewsPage; */
export default connect(mapStateToProps)(AllInterviewsPage);
