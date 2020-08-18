import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { openLoginModal, logOutUser } from "../redux/actions";
import { getUserLogedIn } from "../redux/selectors";

const ErrorPage = ( { errorMessage, errorType, refetch, userLogedIn, logOutUser, openLoginModal } ) => {

    const history = useHistory();

    const something = () => {
        logOutUser();
        history.push("/enterapplication");
    };

    return(
        <div>
            <h1>ISFIT 2021</h1>
            <p> You are not authorized to access this resource. </p>
            <p> Please log in with the button below! :) </p>
            <button onClick={() => something() }>Log in</button>
        </div>
    )
}


const mapStateToProps = state => {
    return {
      userLogedIn: getUserLogedIn(state),
    };
  };
  
export default connect(mapStateToProps, { openLoginModal, logOutUser })(ErrorPage);