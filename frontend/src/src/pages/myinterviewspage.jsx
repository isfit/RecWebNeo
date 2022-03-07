import React, { useState } from "react";
import PageLayout from './pageLayout';
import { connect } from "react-redux";

import { useQuery, useMutation  } from "@apollo/client";

import { MY_INTERVIEWS, SET_INTERVIEW_STATUS } from "../requests/interviewRequests";

import { getUserAuthKey } from "../redux/selectors";

import { getRolesFromToken, getAccessLevel } from "../components/navbar/navbarHelperFunctions";
import InterviewCard from "../components/interviewCard";
import Dropdown from "react-bootstrap/Dropdown";

const InterviewCardOLD = (props) => {
    const datTime = new Date(props.startTime)

    return (
        <div className="card mb-2 px-3 py-2 w-100">
            <div className="flex-grid" style={{justifyContent:"space-between", alignItems: "center"}}>
                <h1 className="my-1">{datTime.toDateString()} {datTime.toTimeString().substring(0,2)}:{datTime.toTimeString().substring(3, 5)}</h1>
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

    const myIntervewsQuery = useQuery(MY_INTERVIEWS);
    const myInterviews = myIntervewsQuery?.data?.myInterviews?.nodes ?? [];

    const [setInterviewStatusMutation] = useMutation(SET_INTERVIEW_STATUS);
    
    const setInterviewStatus = (intId, status) => {
        setInterviewStatusMutation({variables: {interviewId: intId, interviewStatus: status }});
    };
    

    let interviewStatuses = ["Invitation sent","Confirmed","Interviewed"];


    return(
        <PageLayout>
            <div className="container">
                <div className="flex-grid px-5 py-5" style={{flexDirection:"column"}}>
                    <div className="card py-3 px-5 mb-2 w-100">
                        <h4>My interviews</h4>
                        { myInterviews.map( interview => {
                            return (
                                <InterviewCard interview = {interview}>
                                    {AccessLevel > 1 ?
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            {Boolean(interview.status) ? interview.status : "Not assigned"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(e) => {setInterviewStatus(interview.id, "")}}>{"Not assigned"}</Dropdown.Item>
                                            {interviewStatuses.map( status => {
                                                return (
                                                    <Dropdown.Item onClick={(e) => {setInterviewStatus(interview.id, status)}}>{status}</Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown> : null }
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
