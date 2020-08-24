import React, { useState } from "react";
import PageLayout from './pageLayout';
import ScrollList from '../components/scrollList';

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ISFIT_USERS, GET_SECTIONS, SET_ROLE, ADD_SECTION_TO_USER, ADD_TEAM_TO_USER  } from "../requests/userRequests";


const UserEntry = (props) => {
    return (
        <div className="card w-100 h-10 mb-2 py-1">
            <div className="flex-grid">
                <div className="col" style={{flex:"1 1 80%", display:"flex",flexDirection:"column"}}>
                    <h4 className="mb-0" >{props.firstName} {props.lastName}</h4>
                    <span className="text-muted">{props.email}</span>
                    <div>
                        <span className="text-muted">Section: {props.section}</span>
                        <span className="text-muted pl-3">Team: {props.team}</span>
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
    const userData = useQuery(GET_ISFIT_USERS);
    let users = Boolean(userData?.data) ? userData?.data?.users?.nodes : [] ;

    const sectionsData = useQuery(GET_SECTIONS);
    const [chosenSection, setChosenSection] = useState({teams:[]});
    const [chosenTeam, setChosenTeam] = useState(null);
    const [chosenRole, setChosenRole] = useState("");
    const [chosenPassword, setChosenPassword] = useState("");


    const [addedUsers, setAddedUsers] = useState([]);

    const [updateRole, { data, error }] = useMutation(SET_ROLE);
    const [updateSections, { addSectionsData }] = useMutation(ADD_SECTION_TO_USER);
    const [updateTeams, { addTeamsData }] = useMutation(ADD_TEAM_TO_USER);

    /* let users = [{firstName:"Torstein", lastName:"Otterlei",section:"OR", team:"IT"}, {firstName:"Sander", lastName:"Kilen",section:"OR", team:"IT"}] */

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
        if (!(newRole === "")) {
            addedUsers.map( user => {
                /* console.log("USER AND NEWROLE: ", user?.email, newRole) */
                event.preventDefault();
                updateRole({variables: {email: user?.email, role: newRole}});
            })
        };
    };

    const updateUsersPassword = (event, addedUsers, chosenPassword) => {
        if(!(chosenPassword === "")){
            addedUsers.map( user => {
                console.log("USER AND NEWPASSWORD: ", user?.email, chosenPassword)
                /* event.preventDefault(); */
                /* updateRole({variables: {email: user?.email, password: chosenPassword}}); */
            })
        };
    };

    return (
        <PageLayout>
                <h1>WORK IN PROGRESS</h1>
                <div className="flex-grid-adaptive pt-4">
                    <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>Bare users</h4>
                            <ScrollList>
                                { users.map( user => {
                                    return (
                                        <UserEntry 
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            section={user.section} 
                                            team={user.team}
                                            email={user.email}>
                                            <button type="button" className="btn btn-continue my-4 mx-2" onClick={() => addToUserList(user)}>+</button>
                                        </UserEntry>
                                    )
                                }
                                )}
                            </ScrollList>
                        </div>
                    </div>
                    <div className="middle mx-3" style={{flexBasis:"30%", textAlign:"left"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>Upgraded Users</h4>
                            <ScrollList>
                                { users.map( user => {
                                    return (
                                        <UserEntry 
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            section={user.section} 
                                            team={user.team}
                                            email={user.email}>
                                            <button type="button" className="btn btn-continue my-4 mx-2" onClick={() => addToUserList(user)}>+</button>
                                        </UserEntry>
                                    )
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
                                            <option onClick={() => setChosenRole("")} value={"none"}>{"none"}</option>
                                            <option onClick={() => setChosenRole("admin")}>{"Admin"}</option>
                                            <option onClick={() => setChosenRole("insider")}>{"ISFiT Member / Interviewer"}</option>
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