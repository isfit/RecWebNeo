import React, { useState } from "react";
import PageLayout from './pageLayout';
import ScrollList from '../components/scrollList';

import { useQuery,useLazyQuery, useMutation } from "@apollo/client";

import AvailableTimesForm from '../components/availableTimesForm';
import { CREATE_INTERVIEW, GET_APPLICATIONS_WITHOUT_INTERVIEW, APPLICATION_BUSY_HOURS } from "../requests/interviewRequests";
import { GET_ISFIT_USERS } from "../requests/userRequests";


const ApplicationEntry = (props) => {
    return (
        <div className="card w-100 h-10 mb-2 py-1 pr-3">
            <div className="flex-grid">
                <div className="col" style={{flex:"1 1 80%", display:"flex",flexDirection:"column"}}>
                    <h4 className="mb-0" >{props?.applicant?.firstName} {props?.applicant?.lastName} </h4>
                    <div>
                        {/* {console.log("PROPS ", props)} */}
                        { props.positions.map( position => {
                                return(
                                    <div className="card">
                                        <small>{Number(position.key) + 1} {position.value.name}</small>
                                        <small className="text-muted">{position.value.section.name}: {position.value.team.name}</small>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
                <div className="col" style={{flex:"2 1 20%", display:"flex", justifyContent:"center"}}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};


const UserEntry = (props) => {
    return (
        <div className="card w-100 h-10 mb-2 py-1">
            <div className="flex-grid">
                <div className="col" style={{flex:"1 1 80%", display:"flex",flexDirection:"column"}}>
                    <h4 className="mb-0" >{props.firstName} {props.lastName}</h4>
                    <div className="flex-grid">
                        <div className="col pl-0">
                            <p className="text-muted mb-0">Section:</p>
                            { Boolean(props?.sections?.name) ? <p className="text-muted mb-0">{props?.sections?.name}</p> : <p className="text-muted mb-0">none</p> }
                        </div>
                        <div className="col">
                            <p className="text-muted mb-0">Team:</p>
                            { Boolean(props?.teams?.name) ? <p className="text-muted mb-0">{props?.teams?.name}</p> : <p className="text-muted mb-0">none</p> }
                        </div>
                    </div>
                </div>
                <div className="col" style={{flex:"2 1 20%", display:"flex", justifyContent:"center"}}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};


const InterviewsPage = () => {

    const [addedUsers, setAddedUsers] = useState([]);
    const [addedApplication, setAddedApplication] = useState([]);
    const [chosenTime, setChosenTime] = useState(null);

    const applicationsQuery = useQuery(GET_APPLICATIONS_WITHOUT_INTERVIEW);
    const applicationArray = Boolean(applicationsQuery?.data) ? applicationsQuery?.data?.applicationWithoutInterview?.nodes : [] ;

    const [createInterview, { createInterviewData }] = useMutation(CREATE_INTERVIEW);
  
    const [getBusyHours, getBusyHoursData] = useMutation(APPLICATION_BUSY_HOURS);

    
    /* const users = [{firstName:"Torstein", lastName:"Otterlei", sections:["Organizational Resources"], teams:["IT"], email:"torstein@otterlei.no"}] */
    const usersQuery = useQuery(GET_ISFIT_USERS);
    const users = Boolean(applicationsQuery?.data) ? usersQuery?.data?.users?.nodes : [];

    const addToUserList = (user) => {
        let copyList = [...addedUsers]
        let emailList = copyList.map( user => {return user.email})
        if (!emailList.includes(user.email)){
            copyList.push(user);
        }
        setAddedUsers(copyList);
    };

    const removeFromUserList = (user) => {
        let copyList = [...addedUsers]
        const index = copyList.indexOf(user);
        if (index > -1) {
            copyList.splice(index, 1);
        }
        setAddedUsers(copyList);
    };


    const createInterviewMutation = (application, addedUsers, startTime) => {
        let emailArray = addedUsers.map(user => {return user.email})

        /* console.log("EMAILARRAY: ", emailArray)
        console.log("APPLICATION ID: ", application[0].id) */
        /* createInterview({variables: {application: application.id, interviewerEmails: emailArray, start: startTime}}); */

    };


    const getBusyHoursMutation = (addedApplication, addedUsers) => {
        let emailArray = addedUsers.map(user => {return user.email});
        getBusyHours({variables: { input: {application: addedApplication[0].id, interviewerEmail: emailArray}}});
    };  



    return (
        <PageLayout>
            <div className="flex-grid-adaptive pt-4 pb-4">
                <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                    <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                        <h4>Applications without interviews</h4>
                        <ScrollList>
                            { applicationArray.map( application => {
                                return(
                                    <ApplicationEntry
                                        positions={application.positions}
                                        applicant={application.applicant}
                                    >
                                            <button type="button" className="btn btn-outline-success my-4 mx-2" onClick={() => setAddedApplication([application])}>Select</button>
                                    </ApplicationEntry>
                                );
                            }
                            )}
                        </ScrollList>
                    </div>
                </div>
                <div className="middle mx-3" style={{flexBasis:"40%", textAlign:"left"}}>
                    <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                        <h4>Create Interview</h4>

                        { addedApplication.map( application => {
                            return(
                                <ApplicationEntry
                                    positions={application.positions}
                                    applicant={application.applicant}
                                >
                                    <button type="button" className="btn btn-outline-danger my-4 mx-2" onClick={() => setAddedApplication([])}>Remove</button>
                                </ApplicationEntry>
                            );
                        }
                        )}

                        <h4>Add interviewers</h4>
                        
                        { addedUsers.map( user => {
                                return (
                                    <UserEntry
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        sections={user.sections} 
                                        teams={user.teams}
                                        email={user.email}>
                                        <button type="button" className="btn btn-outline-danger my-4 mx-2" onClick={() => removeFromUserList(user)}>-</button>
                                    </UserEntry>
                                )
                            }
                        )}
                        <h5>Interview time: { chosenTime?.toString() ?? "Select a time from the table" } </h5>

                    </div>
                    <button className="btn btn-secondary mt-1 mr-2" onClick={() => getBusyHoursMutation(addedApplication, addedUsers)}>See possible hours</button>
                    <button className="btn btn-success mt-1 mr-2 float-right" onClick={() => createInterviewMutation(addedApplication, addedUsers, chosenTime)}>Confirm interview</button>
                </div>
                <div className="right mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                    <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                        <h4>Available Interviewers</h4>
                            <ScrollList>
                                { users.map( user => {
                                    return (
                                        <UserEntry 
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            sections={user.sections} 
                                            teams={user.teams}
                                            email={user.email}>
                                            <button type="button" className="btn btn-outline-success my-4 mx-2" onClick={() => addToUserList(user)}>+</button>
                                        </UserEntry>
                                    )
                                }
                                )}
                            </ScrollList>
                    </div>
                </div>

            </div>

            <AvailableTimesForm
                busyTimes={ [getBusyHoursData] ?? []}
                setBusyTimes={busy => {
                    setChosenTime(busy)
                }}
                getTime={true}
                startDate = {startInterview}
                endDate = {endInterview}
                hourDiff={1}
                firstTimeSlot={8}
                lastTimeSlot={20}
                readOnly = { false }
            />
        </PageLayout>

    );
};

export default InterviewsPage;