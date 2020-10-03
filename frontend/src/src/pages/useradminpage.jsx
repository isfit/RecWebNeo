import React, { useState, useEffect, useRef } from "react";
import PageLayout from './pageLayout';
import ScrollList from '../components/scrollList';

import { useQuery, useMutation, gql, InMemoryCache } from "@apollo/client";
import { GET_ALL_USERS, GET_SECTIONS, SET_USER_ROLE, SET_SECTIONS_TO_USER, SET_TEAMS_TO_USER, UPDATE_USER_PASSWORD, SET_USER_APPROVED  } from "../requests/userRequests";
import { POSITIONS, ADD_PREFERRED_INTERVIEWERS, REMOVE_PREFERRED_INTERVIEWERS } from "../requests/positionRequests";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const UserEntry = ({user, children}) => {
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

const UserEntrySlim = ({user, children}) => {
    return (
    <div className="card w-100 h-10 mb-2 p-1">
            <div className="flex-grid" style={{justifyContent:"space-between"}}>
                <h4 className="mb-0"> {user.firstName} {user.lastName}</h4>
                {children}
            </div>
        </div>
    )
}


    const UserAdminPage = () => {
    
    //HOOKS
    const [chosenSection, setChosenSection] = useState({teams:[]});
    const [chosenTeam, setChosenTeam] = useState(null);
    const [chosenRole, setChosenRole] = useState("");
    const [chosenPassword, setChosenPassword] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [chosenPositionId, setChosenPositionId] = useState("");

    //QUERIES
    const userData = useQuery(GET_ALL_USERS);
    let users = userData?.data?.users?.nodes ?? [];
    const sectionsData = useQuery(GET_SECTIONS);
    const positions = useQuery(POSITIONS);
    const allPositions = positions?.data?.positions?.nodes ?? [];
    let preferredInterviewers = allPositions?.find(position => position.id === chosenPositionId) ?? []

    //MUTATIONS
    const [updateRole, setUserRoleData] = useMutation(SET_USER_ROLE);
    const [updateSections, updateSectionsData] = useMutation(SET_SECTIONS_TO_USER);
    const [updateTeams, updateTeamsData] = useMutation(SET_TEAMS_TO_USER);
    const [updatePassword, updatePasswordData] = useMutation(UPDATE_USER_PASSWORD);
    const [userApproved, userApprovedData] = useMutation(SET_USER_APPROVED);
    const [addPreferredInterviewers, addPreferredInterviewersData] = useMutation(ADD_PREFERRED_INTERVIEWERS);
    const [removePreferredInterviewers, removePreferredInterviewersData] = useMutation(REMOVE_PREFERRED_INTERVIEWERS);


    //FUNCTIONS
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

    
    const UpdateUserSectionTeam = ({addedUsers, chosenSection, chosenTeam}) => {
        if (Boolean(chosenSection) && Boolean(chosenTeam) ) {
            addedUsers.map( user => {
                updateSections({variables: {email: user.email, sections: [chosenSection] }});
            })
            addedUsers.map( user => {
                updateTeams({variables: {email: user.email, teams: [chosenTeam] }});
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



    const UpdateAddedUsers = ({users, addedUsers}) => {
        let copyList = [...addedUsers]
        copyList.map( (addedUser, index) => {
            users.map(newUser => {
                if (addedUser.id === newUser.id){
                    copyList[index] = newUser
                }
            })
        })
        setAddedUsers(copyList);
    }


    const addInterviewersToPosition = () => {
        let emailList = addedUsers?.map( user => {return user.email})
        if (Boolean(chosenPositionId) && addedUsers.length > 0){
            addPreferredInterviewers({variables: {interviewers: emailList, positionId: chosenPositionId}})
        }
    }

    const removeInterviewerFromPosition = (useremail) => {
        removePreferredInterviewers({variables: {interviewers: [useremail], positionId: chosenPositionId}})
    }
    

    useEffect(() => {
        UpdateAddedUsers({users, addedUsers})
    }, [setUserRoleData.data, updateSectionsData.data, updateTeamsData.data]);


    const resetTeamsRef = useRef(null);

    useEffect(() => {                   //If you choose a new section, reset chosen team
        Boolean(resetTeamsRef?.current?.value) ? resetTeamsRef.current.click() : console.log();
    }, [chosenSection]);


    

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
                         <Tabs>
                        <TabList className="p-0 mb-0">
                            <Tab>Users to be changed</Tab>
                            <Tab>Preferred interviewers</Tab>
                            <button type="button" className="btn btn-outline-secondary" style={{float:"right"}} onClick={() => setAddedUsers([]) }>Reset</button>
                        </TabList>

                        <TabPanel>
                         <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                            
                            { addedUsers.map( user => {
                                return (
                                    <UserEntry user={user} addedUsers={addedUsers} setAddedUsers={setAddedUsers}>
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
                                            <input type="reset" value="NewSectionResetTeams" ref={resetTeamsRef} onClick={() => setChosenTeam(null)} style={{display:"none"}}/>
                                        </form>
                                    </div>
                                    <div className="col" style={{flexBasis:"10%"}}>
                                        <button type="button" className="btn btn-outline-success mt-2" style={{float:"right"}} onClick={() => UpdateUserSectionTeam({addedUsers, chosenSection, chosenTeam})}>Set section/team</button>
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
                        </TabPanel>
                        <TabPanel>
                            <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                            { addedUsers.map( user => {
                                return (
                                    <UserEntrySlim user={user} addedUsers={addedUsers} setAddedUsers={setAddedUsers}>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => removeFromUserList(user)}>-</button>
                                    </UserEntrySlim>
                                )
                            }
                            )}
                            </div>
                            <div className="card w-100 px-3 py-1" style={{minHeight:"30px"}}>
                                <div className="flex-grid" style={{justifyContent:"space-between", alignItems: "center"}}>
                                    <form action="">
                                        <select className="w-100" id="roles" name="roles" onChange={(e) => { setChosenPositionId(e.target.value) }}>
                                            <option value={""}>None</option>
                                            { allPositions.map( (position, index) => {
                                                return(
                                                    <option value={position.id}>{position.name}</option>
                                                )
                                             })
                                            }
                                        </select>
                                    </form>
                                    { (addPreferredInterviewersData.loading || removePreferredInterviewersData.loading) ? <div className="spinner-border spinner-border-sm" role="status" style={{color:"#1bae91"}}>
                                        <span className="sr-only">Loading...</span>
                                    </div> : null}
                                    <button type="button" className="btn btn-outline-success" onClick={() => addInterviewersToPosition() }>Add users</button>
                                </div>
                            </div>
                            <div className="card w-100 px-3 py-3" style={{minHeight:"300px"}}>
                                <h3>Preferred interviewers:</h3>
                                <ScrollList minHeight="100px">
                                { preferredInterviewers?.prefferedInterviewers?.map( user => {
                                    return (
                                        <UserEntrySlim user={user} addedUsers={addedUsers} setAddedUsers={setAddedUsers}>
                                            <button type="button" className="btn btn-outline-danger" onClick={() => removeInterviewerFromPosition(user.email)}>-</button>
                                        </UserEntrySlim>
                                    )
                                }
                                )}
                                </ScrollList>
                            </div>
                        </TabPanel>
                        </Tabs>
                    </div>
                </div>
        </PageLayout>
    );
};


export default UserAdminPage;
