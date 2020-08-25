import React, { useState } from "react";
import PageLayout from './pageLayout';

import { useQuery } from "@apollo/client";

import { MY_INTERVIEWS } from "../requests/interviewRequests";



const InterviewCard = (props) => {
    console.log("STARTTIME ", props.startTime)
    console.log("APPLICANT ", props.applicant)
    console.log("POSITIONS ", props.positions)
    console.log("INTERVIEWERS ", props.interviewers)
    const datTime = new Date(props.startTime)

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
                <div className="col" style={{display:"flex", justifyContent:"right", flexBasis:"10%"}}>
                    { true ? <p className="text-success  my-4 mx-2">Approved</p> : <button type="button" className="btn btn-outline-success my-4 mx-2">Approve</button> }
                </div>
            </div>
            <h5 className="my-1">Interview time: {datTime.toDateString()} {datTime.toTimeString().slice(0,2)}:15 (Digital interview)</h5>
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



const MyInterviewsPage = () => {
    const myIntervewsQuery = useQuery(MY_INTERVIEWS);
    /* const myInterviewsData = Boolean(myIntervewsQuery?.data) ? myIntervewsQuery?.data?.myIntervews : []; */
    const myInterviews = myIntervewsQuery?.data?.myInterviews?.nodes ?? [];
    /* console.log("MY INTERVIEWS ", myInterviews) */

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
                                    applicant = {interview.applicant}
                                    positions = {interview.application.positions}
                                    interviewers = {interview.interviewers}
                                />
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default MyInterviewsPage;
