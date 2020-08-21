import React from "react";
import PageLayout from './pageLayout';
import PositionChoiceBoxReadOnly from "../components/positionChoiceBoxReadOnly"



const UserEntry = ({name, section, team}) => {

    return (
        <div className="card w-100 h-10 mb-2">
            <div className="flex-grid">
                <div className="col">
                    <h4 className="mb-0" >{name}</h4>
                    <span className="text-muted">Section: {section}</span>
                    <span className="text-muted pl-3">Team: {team}</span>
                </div>
                <button type="button" className="btn btn-outline-success my-2 mx-2">+</button>
            </div>
        </div>
    );
};


const UserAdminPage = () => {
    return (
        <PageLayout>
                <div className="flex-grid-adaptive pt-4">
                    <div className="left mx-3" style={{flexBasis:"30%", flexDirection:"column"}}>
                        <div className="card w-100 h-100 px-3 py-3" style={{justifyContent: "center"}}>
                            <h4>All Users</h4>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}/>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}/>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}/>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}/>
                        </div>
                    </div>
                    <div className="middle mx-3" style={{flexBasis:"40%"}}>
                         <div className="card w-100 h-100 px-3 py-3">
                            <h1>Heisann</h1>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}/>
                            <UserEntry name={"Torstein otterlei"} section={"my section"} team={"my team"}/>
                        </div>
                        <button>Upgrade</button>
                    </div>
                    <div className="right mx-3" style={{flexBasis:"30%"}}>
                        <div className="card w-100 h-100">
                            <h1>Admin users</h1>
                        </div>
                    </div>
                </div>
        </PageLayout>
    );
};


export default UserAdminPage;