import React, { useState } from "react";
import PageLayout from './pageLayout';
import ScrollList from '../components/scrollList';

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_ALL_USERS } from "../requests/userRequests";
import { APPLICATIONS } from "../requests/applicationRequests";





const UserEntry = (props) => {
    return (
        <div className="card w-100 h-10 mb-2 py-1">
            <div className="flex-grid">
                <div className="col">
                    <span className="text-muted">{props.email}</span>
                </div>
            </div>
        </div>
    );
};



const UsersWithoutApplication = () => {
    const userData = useQuery(GET_ALL_USERS, {fetchPolicy: "no-cache"});
    let users = Boolean(userData?.data) ? userData?.data?.users?.nodes : [] ;

    const applicationData = useQuery(APPLICATIONS, {fetchPolicy: "no-cache"});

    let applicationsArray = applicationData?.data?.applications?.nodes ?? [];


    let applicantIdArray = []
    applicationsArray.map( application => {
            applicantIdArray.push(application.applicant.id)
        }   
    );
    
    let usersWithoutApplications = []
    users.map( user => {
        if (!applicantIdArray.includes(user.id) && !(user.email.slice(-8) === "isfit.no")){
            usersWithoutApplications.push(user)
        }
    });

    return(
        <PageLayout>
            <div className="container">
                <div className="flex-grid px-5 py-5" style={{flexDirection:"column"}}>
                    <div className="card py-3 px-5 mb-2 w-100">
                        <h4>Users that have not entered an application: {usersWithoutApplications.length} </h4>
                        <span className="text-muted mb-2">Here you can copy-paste the list of users that have not yet entered an application.</span>
                        <span className="text-muted mb-3">Note that this list only excludes users with an @isfit.no email address. Test users and ISFiT members that have made a user with another email will show up in this list and will have to be removed manually.</span>
                        <span className="text-muted mb-3">Names are intentionally not included to make the list easier to copy-paste. Tell me (Torstein) if you want names to appear here as well, but then you will have to remove them manually.</span>
                        <ScrollList>
                            { usersWithoutApplications.map( user => {
                                if (user.email.slice(-8) !== "isfit.no"){
                                    return (
                                        <UserEntry 
                                            firstName={user.firstName}
                                            lastName={user.lastName}
                                            sections={user.sections} 
                                            teams={user.teams}
                                            email={user.email}
                                            roles={user.roles}
                                        >
                                        </UserEntry>
                                    )
                                }
                            }
                            )}
                        </ScrollList>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};


export default UsersWithoutApplication;
