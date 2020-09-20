import React, { useState } from "react";
import PageLayout from './pageLayout';
import ScrollList from '../components/scrollList';

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ALL_USERS, GET_SECTIONS, SET_USER_ROLE, SET_SECTIONS_TO_USER, SET_TEAMS_TO_USER, UPDATE_USER_PASSWORD, SET_USER_APPROVED  } from "../requests/userRequests";


const UserEntry = ({user,children}) => {
    let userSection = (user.sections !== null && user.sections.length > 0) ? user.sections[0].name : "none" ;
    let userTeam = (user.teams !== null && user.teams.length > 0) ? user.teams[0].name : "none" ;
    let userRoles = (user.roles !== null && user.roles.length > 0) ? user.roles[0] : "none" ;


    return (
        <div className="card w-100 h-10 mb-2 py-1">
            <div className="flex-grid">
                <div className="col" style={{flex:"1 1 80%", display:"flex",flexDirection:"column"}}>
                    <h4 className="mb-0"> {user.firstName} {user.lastName}</h4>
                    <span className="text-muted">{user.email}</span>
                    <div>
                        <p className="text-muted mb-0">Section: {userSection}</p>
                        <p className="text-muted mb-0">Team: {userTeam}</p>
                        <p className="text-muted mb-0">Role: {userRoles}</p>
                    </div>
                </div>
                <div className="col" style={{flex:"2 1 20%", display:"flex", justifyContent:"center"}}>
                    {children}
                </div>
            </div>
        </div>
    );
};


const UserAdminPage = () => {
    const userData = useQuery(GET_ALL_USERS, {fetchPolicy: "no-cache"});
    let users = userData?.data?.users?.nodes ?? [];

    const sectionsData = useQuery(GET_SECTIONS);
    const [chosenSection, setChosenSection] = useState({teams:[]});

    const [chosenTeam, setChosenTeam] = useState(null);
    const [chosenRole, setChosenRole] = useState("");
    const [chosenPassword, setChosenPassword] = useState("");


    const [addedUsers, setAddedUsers] = useState([]);

    const [updateRole, setUserRoleData] = useMutation(SET_USER_ROLE);
    const [updateSections, updateSectionsData] = useMutation(SET_SECTIONS_TO_USER);
    const [updateTeams, updateTeamsData] = useMutation(SET_TEAMS_TO_USER);
    const [updatePassword, updatePasswordData] = useMutation(UPDATE_USER_PASSWORD);
    const [userApproved, userApprovedData] = useMutation(SET_USER_APPROVED);

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
        if (Boolean(chosenSection) && Boolean(chosenTeam) ) {
                addedUsers.map( user => {
                    addedUsers.map( user => {
                        event.preventDefault();
                        updateSections({variables: {email: user?.email, sections: [chosenSection] }});
                        updateTeams({variables: {email: user?.email, teams: [chosenTeam] }});
                    })
                })
        };
    };
    
    const updateUsersRole = (event, addedUsers, newRole) => {
        addedUsers.map( user => {
            /* console.log("USER AND NEWROLE: ", user?.email, newRole) */   
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

    const setUsersNotApproved = (addedUsers) => {
        addedUsers.map( user => {
            userApproved({variables: {email: user?.email, approved: false,}})
        })
    };

    const getSectionFromID = (sectionsData, sectionId) => {
        let sectionsArray = sectionsData?.sections ?? [];
        let sectionObject = null;

        sectionsArray.map( section => {
            if (section.id === sectionId) {
                sectionObject = section
            }
        })

        return sectionObject ?? {teams:[]}
    };


    return (
        <PageLayout>
                <div className="flex-grid-adaptive pt-4 pb-4">
                    <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>Applicants/Other users</h4>
                            <ScrollList>
                                { users.map( user => {
                                    if (user.email.slice(-8) !== "isfit.no"){
                                        return (
                                            <UserEntry user={user}>
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
                                            <UserEntry user={user}>
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
                                    <UserEntry user={user}>
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
                                        <select className="w-100" id="sections" name="sections" onChange={(e) => { setChosenSection(e.target.value) }}>
                                            <option value={{teams:[]}}>{"none"}</option>
                                            {sectionsData?.data?.sections.map( section => {
                                                return (
                                                    <option value={section.id}>{section.name}</option>
                                                    )
                                                })}
                                        </select>
                                        </form>
                                    </div>
                                    <div className="col">
                                        <small>Team</small>
                                        <form action="">
                                        <select className="w-100" id="teams" name="teams" onChange={(e) => { setChosenTeam(e.target.value) }} >
                                            <option value={null}>{"none"}</option>
                                            {getSectionFromID(sectionsData?.data, chosenSection).teams?.map( team => {
                                                return (
                                                    <option value={team.id}>{team.name}</option>
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
                                        <select className="w-100" id="roles" name="roles" onChange={(e) => { setChosenRole(e.target.value) }} >
                                            <option value={""}>{"Applicant"}</option>
                                            <option value={"internal"} >{"ISFiT Member / Interviewer"}</option>
                                            <option value={"admin"} >{"Admin"}</option>
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
                                <div className="flex-grid border-bottom pb-3">
                                    <div className="col pr-0" style={{flexBasis:"70%"}}>
                                        <small style={{fontSize:"11px"}}>This will remove a user and his/her application, but not any interview given to that person. That will have to be deleted separately.</small>
                                    </div>
                                    <div className="col pl-0" style={{flexBasis:"30%"}}>
                                        <button type="button" className="btn btn-danger mt-2" style={{float:"right"}} onClick={() => setUsersNotApproved(addedUsers)}>Remove users</button>
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
