import React, { useState } from "react";
import PageLayout from './pageLayout';
import PositionChoiceBoxReadOnly from "../components/positionChoiceBoxReadOnly"
import { prioritizePosition } from "../redux/actions";
import positionsModule from "../components/positionsModule";



const UserEntry = (props) => {
    return (
        <div className="card w-100 h-10 mb-2">
            <div className="flex-grid">
                <div className="col">
                    <h4 className="mb-0" >{props.firstName} {props.lastName}</h4>
                    <span className="text-muted">Section: {props.section}</span>
                    <span className="text-muted pl-3">Team: {props.team}</span>
                </div>
                    {props.children}
                </div>
        </div>
    );
};


const UserAdminPage = () => {
    const [addedUsers, setAddedUsers] = useState([]);
    let users = [{firstName:"Torstein", lastName:"Otterlei",section:"OR", team:"IT"}, {firstName:"Sander", lastName:"Kilen",section:"OR", team:"IT"}]

    const addToUserList = (user) => {
        let copyList = [...addedUsers]
        copyList.push(user);
        setAddedUsers(copyList);
    };

    const removeToUserList = (user) => {
        let copyList = [...addedUsers]
        const index = copyList.indexOf(user);
        if (index > -1) {
            copyList.splice(index, 1);
        }
        setAddedUsers(copyList);
    };

    return (
        <PageLayout>
                <h1>WORK IN PROGRESS</h1>
                <div className="flex-grid-adaptive pt-4">
                    <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>All Users</h4>
                            { users.map( user => {
                                return (
                                    <UserEntry 
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        section={user.section} 
                                        team={user.team}>
                                        <button type="button" className="btn btn-outline-success my-2 mx-2" onClick={() => addToUserList(user)}>+</button>
                                    </UserEntry>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div className="middle mx-3" style={{flexBasis:"40%", textAlign:"left"}}>
                         <div className="card w-100 h-100 px-3 py-3">
                            <h4>Users to be upgraded</h4>
                            { addedUsers.map( user => {
                                return (
                                    <UserEntry 
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        section={user.section} 
                                        team={user.team}>
                                        <button type="button" className="btn btn-outline-danger my-2 mx-2" onClick={() => removeToUserList(user)}>-</button>
                                    </UserEntry>
                                )
                            }
                            )}
                        </div>
                        <button type="button" className="btn btn-outline-success mt-2" style={{float:"right"}}>Upgrade Users</button>
                    </div>
                    <div className="right mx-3" style={{flexBasis:"30%"}}>
                        <div className="card w-100 h-100 px-3 py-3">
                            <h4>ISFiT users</h4>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}></UserEntry>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}></UserEntry>
                        </div>
                    </div>
                </div>
        </PageLayout>
    );
};


export default UserAdminPage;