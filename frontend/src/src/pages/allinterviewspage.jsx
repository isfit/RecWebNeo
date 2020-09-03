import React, { useState } from "react";
import PageLayout from './pageLayout';
import { connect } from "react-redux";

import { useQuery, useMutation } from "@apollo/client";

import { ALL_INTERVIEWS, DELETE_INTERVIEW, SET_INTERVIEW_STATUS } from "../requests/interviewRequests";

import { getUserAuthKey } from "../redux/selectors";

import { getRolesFromToken, getAccessLevel } from "../components/navbar/navbarHelperFunctions";


const InterviewCard = (props) => {
    const datTime = new Date(props.startTime);

        return (
        <div className="card mb-2 px-3 py-2 w-100">
            <div className="flex-grid" style={{justifyContent:"space-between", alignItems: "center"}}>
                <h1 className="my-1">{datTime.toDateString()} {datTime.toTimeString().slice(0,2)}:15</h1>
                {props.children}
            </div>
            <div className="flex-grid w-100 mb-1">
                <div className="col pl-0" style={{display:"flex", flexBasis:"50%", flexDirection:"column" }}>
                    <h3 className="mb-0">{props.applicant.firstName} {props.applicant.lastName}</h3>
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
        </div>
    );
};



const AllInterviewsPage = ({userAuthKey}) => {
    const RolesArray = getRolesFromToken(userAuthKey);
    const AccessLevel = getAccessLevel(RolesArray); 

    const [deleteInterviewMutation, deleteInterviewMutationData] = useMutation(DELETE_INTERVIEW);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const deleteInterview = (event, interviewId) => { 
        console.log("INTERVIEW ID:",interviewId)
        deleteInterviewMutation({variables: {input: {id: interviewId}}});
        setDeleteConfirm(false)
    };


    const allIntervewsQuery = useQuery(ALL_INTERVIEWS, {fetchPolicy: "no-cache"});
    /* const myInterviewsData = Boolean(myIntervewsQuery?.data) ? myIntervewsQuery?.data?.myIntervews : []; */
    const allInterviews = allIntervewsQuery?.data?.interviews?.nodes ?? [];

    const [setInterviewStatusMutation] = useMutation(SET_INTERVIEW_STATUS);
    

    const setInterviewStatus = (intId, status) => {
        setInterviewStatusMutation({variables: {interviewId: intId, interviewStatus: status }});
    };

    const [chosenInterviewStatus, setChosenInterviewStatus] = useState("Not assigned");

    if (allIntervewsQuery.loading){
        return (
            <PageLayout>
                Loading applications. Please wait.
            </PageLayout>
        )
    }

    return(
        <PageLayout>
            <div className="container">
                <div className="flex-grid px-5 py-5" style={{flexDirection:"column"}}>
                    <div className="card py-3 px-5 mb-2 w-100">
                        <h4>All interviews</h4>
                        {allInterviews.map( interview => {
                            return (
                                <InterviewCard 
                                    startTime = {interview.start}
                                    applicant = {interview.applicant.user}
                                    positions = {interview.application.positions}
                                    interviewers = {interview.interviewers}
                                >   <small>Status: {interview.status ?? "not assigned"}</small>
                                    <div className="flex-grid" style={{alignItems: "center", justifyContent: "center"}}>
                                     <form action="">
                                         <select className="w-100" id="status" name="status" onChange={(e) => {setChosenInterviewStatus(e.target.value)}}>
                                             <option value={"Not assigned"}>{"Not assigned"}</option>
                                             <option value={"Invitation sent"}>{"Invitation sent"}</option>
                                             <option value={"Confirmed"} >{"Confirmed"}</option>
                                             <option value={"Interviewed"} >{"Interviewed"}</option>
                                         </select>
                                     </form>
                                        <div><button className="btn btn-secondary ml-1 py-1 px-1" onClick={event => setInterviewStatus(interview.id, chosenInterviewStatus)}>Set Status</button></div>
                                    </div>
                                   {(AccessLevel>2) ? deleteConfirm ? <div><button className="btn btn-secondary mr-1" onClick={() => setDeleteConfirm(false)}>Cancel</button><button className="btn btn-danger" onClick={(event) => deleteInterview(event, interview.id)}>DELETE</button></div> : <div className="ml-5"><button className="btn btn-danger" onClick={() => setDeleteConfirm(true)}>Delete</button></div> : null}
                                
                                </InterviewCard>
                            )
                        }
                        )}
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
