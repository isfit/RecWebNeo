import React, { useState } from "react";
import PageLayout from './pageLayout';
import { connect } from "react-redux";

import { useQuery, useMutation  } from "@apollo/client";

import { MY_INTERVIEWS, SET_INTERVIEW_STATUS } from "../requests/interviewRequests";

import { getUserAuthKey } from "../redux/selectors";

import { getRolesFromToken, getAccessLevel } from "../components/navbar/navbarHelperFunctions";


const InterviewCard = (props) => {
    const datTime = new Date(props.startTime)

    return (
        <div className="card mb-2 px-3 py-2 w-100">
            <div className="flex-grid" style={{justifyContent:"space-between", alignItems: "center"}}>
                <h1 className="my-1">{datTime.toDateString()} {datTime.toTimeString().slice(0,2)}:15</h1>
                {props.accessLevel>1 ? props.children : null}
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



const MyInterviewsPage = ({userAuthKey}) => {
    const RolesArray = getRolesFromToken(userAuthKey);
    const AccessLevel = getAccessLevel(RolesArray); 

    const myIntervewsQuery = useQuery(MY_INTERVIEWS, {fetchPolicy: "no-cache"});
    const myInterviews = myIntervewsQuery?.data?.myInterviews?.nodes ?? [];

    const [setInterviewStatusMutation] = useMutation(SET_INTERVIEW_STATUS);
    
    const setInterviewStatus = (intId, status) => {
        setInterviewStatusMutation({variables: {interviewId: intId, interviewStatus: status }});
    };

    const [chosenInterviewStatus, setChosenInterviewStatus] = useState("Not assigned");


    return(
        <PageLayout>
            <div className="container">
                <div className="flex-grid px-5 py-5" style={{flexDirection:"column"}}>
                    <div className="card py-3 px-5 mb-2 w-100">
                        <h4>My interviews</h4>
                        { myInterviews.map( interview => {
                            return (
                                <InterviewCard 
                                    startTime = {interview.start}
                                    applicant = {interview.applicant.user}
                                    positions = {interview.application.positions}
                                    interviewers = {interview.interviewers}
                                    accessLevel = {AccessLevel}
                                > <small>Status: {interview.status ?? "not assigned"}</small>
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

export default connect(mapStateToProps)(MyInterviewsPage);
