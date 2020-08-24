import React, { useState } from "react";
import PageLayout from './pageLayout';
import ScrollList from '../components/scrollList';

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ALL_USERS, GET_SECTIONS, SET_USER_ROLE, SET_SECTIONS_TO_USER, SET_TEAMS_TO_USER, UPDATE_USER_PASSWORD  } from "../requests/userRequests";


const UserEntry = (props) => {
    return (
        <div className="card w-100 h-10 mb-2 py-1">
            <div className="flex-grid">
                <div className="col" style={{flex:"1 1 80%", display:"flex",flexDirection:"column"}}>
                    <h4 className="mb-0" >{props.firstName} {props.lastName}</h4>
                    <span className="text-muted">{props.email}</span>
                    <div>
                        { Boolean(props.sections) ? <p className="text-muted mb-0">Section: {props.sections[0].name}</p> : <p className="text-muted mb-0">Section: none</p> }
                        { Boolean(props.teams) ? <p className="text-muted mb-0">Team: {props.teams[0].name}</p> : <p className="text-muted mb-0">Team: none</p> }
                    </div>
                </div>
                <div className="col" style={{flex:"2 1 20%", display:"flex", justifyContent:"center"}}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};


const UserAdminPage = () => {
    const userData = useQuery(GET_ALL_USERS);
    let users = Boolean(userData?.data) ? userData?.data?.users?.nodes : [] ;

    const sectionsData = useQuery(GET_SECTIONS);
    const [chosenSection, setChosenSection] = useState({teams:[]});
    const [chosenTeam, setChosenTeam] = useState(null);
    const [chosenRole, setChosenRole] = useState("");
    const [chosenPassword, setChosenPassword] = useState("");


    const [addedUsers, setAddedUsers] = useState([]);

    const [updateRole, { data, error }] = useMutation(SET_USER_ROLE);
    const [updateSections, { setSectionsData }] = useMutation(SET_SECTIONS_TO_USER);
    const [updateTeams, { setTeamsData }] = useMutation(SET_TEAMS_TO_USER);
    const [updatePassword, {setPasswordData}] = useMutation(UPDATE_USER_PASSWORD);

    const addToUserList = (user) => {
        let copyList = [...addedUsers]
        copyList.push(user);
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

    
    const updateUserSectionTeam = (event, addedUsers, chosenSection, chosenTeam) => {
        if (!(chosenSection?.teams === undefined|| chosenSection?.teams.length == 0) ) {
            if ( Boolean(chosenTeam) ) {
                addedUsers.map( user => {
                    addedUsers.map( user => {
                        event.preventDefault();
                        updateSections({variables: {email: user?.email, sections: [chosenSection?.id] }});
                        updateTeams({variables: {email: user?.email, teams: [chosenTeam?.id] }});
                    })
                })
            };
        };
    };
    
    const updateUsersRole = (event, addedUsers, newRole) => {
        addedUsers.map( user => {
            /* console.log("USER AND NEWROLE: ", user?.email, newRole) */
            event.preventDefault();
            updateRole({variables: {email: user?.email, role: newRole}});
        })
    };

    const updateUsersPassword = (event, addedUsers, chosenPassword) => {
        if(!(chosenPassword === "")){
            addedUsers.map( user => {
                updatePassword({variables: {email: user?.email, password: chosenPassword}});
            })
        };
    };

    return (
        <PageLayout>
                <div className="flex-grid-adaptive pt-4">
                    <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>Applicants/Other users</h4>
                            <ScrollList>
                                { users.map( user => {
                                    if (user.email.slice(-8) !== "isfit.no"){
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
                                }
                                )}
                            </ScrollList>
                        </div>
                    </div>
                    <div className="middle mx-3" style={{flexBasis:"30%", textAlign:"left"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>@ISFiT Users</h4>
                            <ScrollList>
                                { users.map( user => {
                                    if (user.email.slice(-8) === "isfit.no"){
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
                                }
                                )}
                            </ScrollList>
                        </div>
                    </div>

                    <div className="right mx-3" style={{flexBasis:"40%", flexDirection:"column"}}>
                         <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                            <h4>Users to be changed</h4>
                            { addedUsers.map( user => {
                                return (
                                    <UserEntry 
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        section={user.section} 
                                        team={user.team}
                                        email={user.email}>
                                        <button type="button" className="btn btn-outline-danger my-4 mx-2" onClick={() => removeFromUserList(user)}>-</button>
                                    </UserEntry>
                                )
                            }
                            )}
                        </div>
                        <div className="card w-100 px-3 py-3">
                            <div className="flex-grid" style={{flexDirection:"column"}}>
                                <div className="flex-grid border-bottom pb-3">
                                    <div className="col">
                                        <small>Section</small>
                                        <form action="">
                                        <select className="w-100" id="sections" name="sections">
                                            <option value={"none"} onClick={() => setChosenSection({teams:[]})}>{"none"}</option>
                                            {sectionsData?.data?.sections.map( section => {
                                                return (
                                                    <option value={section.name} onClick={() => setChosenSection(section)}>{section.name} </option>
                                                    )
                                                })}
                                        </select>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <small>Team</small>
                                        <form action="">
                                        <select className="w-100" id="teams" name="teams">
                                            <option value={"none"} onClick={() => setChosenTeam(null)}>{"none"}</option>
                                            {chosenSection?.teams?.map( team => {
                                                return (
                                                    <option value={team.name} onClick={() => setChosenTeam(team)}>{team.name}</option>
                                                    )
                                                })}
                                        </select>
                                        </form>
                                    </div>
                                    <div className="col" style={{flexBasis:"10%"}}>
                                        <button type="button" className="btn btn-outline-success mt-2" style={{float:"right"}} onClick={event => updateUserSectionTeam(event, addedUsers, chosenSection, chosenTeam)}>Set section/team</button>
                                    </div>
                                </div>
                                        
                                <div className="flex-grid border-bottom pb-3">
                                    <div className="col">
                                        <small>Access Level</small>
                                        <form action="">
                                        <select className="w-100" id="sections" name="sections">
                                            <option onClick={() => setChosenRole("")} value={"Applicant"}>{"Applicant"}</option>
                                            <option onClick={() => setChosenRole("insider")}>{"ISFiT Member / Interviewer"}</option>
                                            <option onClick={() => setChosenRole("admin")}>{"Admin"}</option>
                                        </select>
                                        </form>
                                    </div>
                                    <div className="col" style={{flexBasis:"10%"}}>
                                        <button type="button" className="btn btn-outline-success mt-2" style={{float:"right"}} onClick={event => updateUsersRole(event, addedUsers, chosenRole)}>Set access level</button>
                                    </div>
                                </div>

                                <div className="flex-grid border-bottom pb-3">
                                    <div className="col">
                                        <small>Change password</small>
                                        <form>
                                            <input type="text" onChange={e => setChosenPassword(e.target.value) }/>
                                        </form>           
                                    </div>
                                    <div className="col" style={{flexBasis:"10%"}}>
                                        <button type="button" className="btn btn-outline-success mt-2" style={{float:"right"}} onClick={event => updateUsersPassword(event, addedUsers, chosenPassword)}>Set password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </PageLayout>
    );
};


export default UserAdminPage;