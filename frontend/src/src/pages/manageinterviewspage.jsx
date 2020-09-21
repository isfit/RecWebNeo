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
                    <small className="text-muted">{props?.applicant?.email}</small>
                    <div>
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

const UserEntry = ({user,children}) => {
    let userSection = (user.sections !== null && user.sections.length > 0) ? user.sections[0].name : "none" ;
    let userTeam = (user.teams !== null && user.teams.length > 0) ? user.teams[0].name : "none" ;


    return (
        <div className="card w-100 h-10 mb-2 py-1">
            <div className="flex-grid">
                <div className="col" style={{flex:"1 1 80%", display:"flex",flexDirection:"column"}}>
                    <h4 className="mb-0" >{user.firstName} {user.lastName}</h4>
                    <div className="flex-grid">
                        <div className="col pl-0" style={{flexBasis:"50%"}}>
                            <p className="text-muted mb-0">Section:</p>
                            <p className="text-muted mb-0">{userSection}</p>
                        </div>
                        <div className="col" style={{flexBasis:"50%"}}>
                            <p className="text-muted mb-0">Team:</p>
                            <p className="text-muted mb-0">{userTeam}</p>
                        </div>
                    </div>
                </div>
                <div className="col" style={{flex:"2 1 20%", display:"flex", justifyContent:"center"}}>
                    {children}
                </div>
            </div>
        </div>
    );
};


const CreateInterviewBox = ({chosenApplication, addedUsers, chosenTime, chosenLocation, setChosenApplication, removeFromUserList, setChosenLocation}) => {

    return (
    <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
        <h4>Create Interview</h4>

        { chosenApplication.map( application => {
            return(
                <ApplicationEntry
                    positions={application.positions}
                    applicant={application.applicant}
                >
                    <button type="button" className="btn btn-outline-danger my-4 mx-2" onClick={() => setChosenApplication([])}>Remove</button>
                </ApplicationEntry>
            );
        }
        )}

        {chosenApplication.length === 0 ? <div style={{minHeight:"184px"}}></div>: null}
    

        <h4>Add interviewers</h4>
        
        { addedUsers.map( user => {
                return (
                    <UserEntry user={user}>
                        <button type="button" className="btn btn-outline-danger my-4 mx-2" onClick={() => removeFromUserList(user)}>-</button>
                    </UserEntry>
                )}
        )}
        <h5 className="mt-3">Interview time: { chosenTime?.toString() ?? "Select a time from the table" } </h5>
        <div className="flex-grid mt-3">
            <h5 className="mr-1">Enter location:</h5>
            <input className="w-50" value={chosenLocation} placeholder="Enter room or URL" onChange={(e) => setChosenLocation(e.target.value)}/>
        </div>
    </div>
    );

};


const InterviewsPage = () => {

    //QUERIES
    const applicationsQuery = useQuery(GET_APPLICATIONS_WITHOUT_INTERVIEW);
    const applicationArray = Boolean(applicationsQuery?.data) ? applicationsQuery?.data?.applicationWithoutInterview?.nodes : [] ;
    const usersQuery = useQuery(GET_ISFIT_USERS);
    const users = usersQuery?.data?.users?.nodes ?? [];

    //MUTATIONS
    const [getBusyHours, busyHoursData] = useMutation(APPLICATION_BUSY_HOURS);
    const [createInterview, { data }] = useMutation(CREATE_INTERVIEW, {
        onError: ({ graphQLErrors, networkError }) => {
            graphQLErrors.map(({ message, locations, path }) => {
                setCreateInterviewError(message);
            }
            );

            if (networkError) console.log(`[Network error]: ${networkError}`);
        },
      });

    //HOOKS
    const [addedUsers, setAddedUsers] = useState([]);
    const [chosenApplication, setChosenApplication] = useState([]);
    const [chosenTime, setChosenTime] = useState(null);
    const [createInterviewError, setCreateInterviewError] = useState(null);
    const [chosenLocation, setChosenLocation] = useState("");



    //VARIABLES
    const startInterview = new Date("2020-08-27T00:00:00.000Z");
    const endInterview = new Date("2020-09-10T00:00:00.000Z");
    

    //FUNCTIONS
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


    const createInterviewMutation = (application, addedUsers, startTime, chosenLocation) => {
        let emailArray = addedUsers.map(user => {return user.email})
        setCreateInterviewError(null);
        createInterview({
            variables: {input: {application: application[0]?.id, interviewerEmails: emailArray, start: startTime?.toISOString(), location:chosenLocation}},
        });
        setChosenLocation("");
    };

    const getBusyHoursMutation = (addedApplication, addedUsers) => {
        let emailArray = addedUsers.map(user => {return user.email});
        getBusyHours({variables: { input: {application: addedApplication[0].id, interviewerEmail: emailArray}}});
    };  



    return (
        <PageLayout>
            <div style={{width: "100%", textAlign: "center", fontSize: "2em"}}>
                { createInterviewError }
                { data != null ? "The interview was created" : "" }
            </div>
            <div className="flex-grid-adaptive pt-4 pb-4">
                <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                    <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                        <h4>Applications without interviews</h4>
                        <ScrollList minHeight="650px">
                            { applicationArray.map( application => {
                                return(
                                    <ApplicationEntry
                                        positions={application.positions}
                                        applicant={application.applicant}
                                    >
                                            <button type="button" className="btn btn-outline-success my-4 mx-2" onClick={() => setChosenApplication([application])}>Select</button>
                                    </ApplicationEntry>
                                );
                            }
                            )}
                        </ScrollList>
                    </div>
                </div>
                <div className="middle mx-3" style={{flexBasis:"40%", textAlign:"left"}}>
                    <CreateInterviewBox chosenApplication={chosenApplication} addedUsers={addedUsers} chosenLocation={chosenLocation} chosenTime={chosenTime} setChosenApplication={setChosenApplication} removeFromUserList={removeFromUserList} setChosenLocation={setChosenLocation} />
                    <button className="btn btn-secondary mt-1 mr-2" onClick={() => getBusyHoursMutation(chosenApplication, addedUsers)}>See possible hours</button>
                    <button className="btn btn-success mt-1 mr-2 float-right" onClick={() => createInterviewMutation(chosenApplication, addedUsers, chosenTime, chosenLocation)}>Confirm interview</button>
                </div>
                <div className="right mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                    <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                        <h4>Available Interviewers</h4>
                            <ScrollList minHeight="650px">
                                { users.map( user => {
                                    return (
                                        <UserEntry user={user}>
                                            <button type="button" className="btn btn-outline-success my-4 mx-2" onClick={() => addToUserList(user)}>+</button>
                                        </UserEntry>
                                )})}
                            </ScrollList>
                    </div>
                </div>
            </div>

            <AvailableTimesForm
                busyTimes={busyHoursData?.data?.applicationBusyTimes ?? []}
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
                selectable = { false }
            />
        </PageLayout>

    );
};

export default InterviewsPage;