import React, { useState } from "react";
import PageLayout from './pageLayout';
import { connect } from "react-redux";

import { useQuery, useMutation } from "@apollo/client";

import { ALL_INTERVIEWS, DELETE_INTERVIEW } from "../requests/interviewRequests";

import { getUserAuthKey } from "../redux/selectors";

import { getRolesFromToken, getAccessLevel } from "../components/navbar/navbarHelperFunctions";


const InterviewCard = (props) => {
    const datTime = new Date(props.startTime);

    return (
        <div className="card mb-2 px-3 py-2 w-100">
            <div className="flex-grid w-100 mb-1 border-bottom">
                <div className="col pl-0" style={{display:"flex", flexBasis:"25%", flexDirection:"column" }}>
                    <h4 className="mb-0">{props.applicant.user.firstName} {props.applicant.user.lastName}</h4>
                    <p className="mb-0">{props.applicant.user.email}</p>
                     { Boolean(props.applicant.user.phoneNumber) ? <p className="mb-0">{props.applicant.user.phoneNumber}</p> : <p className="mb-0">No phonenumber registered</p>}
                </div>
                <div className="col" style={{display:"flex", flexBasis:"65%" }}>
                    <div className="flex-grid w-100">
                        <div className="col" style={{display:"flex", flexDirection:"column"}}>
                            {props.positions.map( position => {
                                return(
                                    <div className="flex-grid">
                                        <p className="mb-0">{Number(position.key)+1} {position.value.section.name}: {position.value.team.name}</p>
                                        <p className="mb-0 pl-3">{position.value.name}</p>
                                    </div>
                                )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grid w-100 mb-1" style={{justifyContent:"space-between"}}>
                <h5 className="my-1">Interview time: {datTime.toDateString()} {datTime.toTimeString().slice(0,2)}:15 (Digital interview)</h5>
                {props.children}
            </div>
            <div className="border-top">
                <h5 className="mb-0 mt-2">Interviewers</h5>
                    { props.interviewers.map( interviewer => {
                        return(
                            <div className="flex-grid">
                                <p className="mb-0">{interviewer.user.email}</p>
                            </div>
                        )

                    })
                    }
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

    return(
        <PageLayout>
            <div className="container">
                <div className="flex-grid px-5 py-5" style={{flexDirection:"column"}}>
                    <div className="card py-3 px-5 mb-2 w-100">
                        <h4>All interviews</h4>
                        { allInterviews.map( interview => {
                            return (
                                <InterviewCard 
                                    startTime = {interview.start}
                                    applicant = {interview.applicant}
                                    positions = {interview.application.positions}
                                    interviewers = {interview.interviewers}
                                >
                                   {(AccessLevel>2) ? deleteConfirm ? <div><button className="btn btn-secondary mr-1" onClick={() => setDeleteConfirm(false)}>Cancel</button><button className="btn btn-danger" onClick={(event) => deleteInterview(event, interview.id)}>DELETE</button></div> : <button className="btn btn-danger" onClick={() => setDeleteConfirm(true)}>Delete</button> : null}
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
