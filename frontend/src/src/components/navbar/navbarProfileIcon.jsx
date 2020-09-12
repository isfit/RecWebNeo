import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { ME_NAME } from "../../requests/userRequests";
import { connect } from "react-redux";
import { logOutUser } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const NavbarProfileIcon = ({accessLevel, logOutUser}) => {
    const history = useHistory();

    const { loading, error, data } = useQuery(ME_NAME, {
        fetchPolicy: "no-cache",
        onError: ({ graphQLErrors, networkError }) => {
            logOutUser();
            history.push("/");
        },
    },);
    if (data == null) {
        return <div></div>;
    }

    let RoleName = "Applicant";
    switch(accessLevel){
        case 4: RoleName = "Super user"; break;
        case 3: RoleName = "Admin / Leader in ISFiT"; break;
        case 2: RoleName = "ISFiT Member"; break;
    }

    return (
        <a href="/myprofile">
            <span className="ml-2 d-lg-block" style={{textAlign: "right"}}>
                <span className="text-default"> { data.me?.firstName } { data.me?.lastName} </span>
                <small className="text-muted d-block">{RoleName}</small>
            </span>
        </a>
    );
}

export default connect(null, { logOutUser })(NavbarProfileIcon);;