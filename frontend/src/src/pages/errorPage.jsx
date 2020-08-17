import React, { useEffect, useState } from 'react';

import { connect } from "react-redux";
import { openLoginModal, logOutUser } from "../redux/actions";
import { getUserLogedIn } from "../redux/selectors";

const ErrorPage = ( { errorMessage, errorType, refetch, userLogedIn, logOutUser, openLoginModal } ) => {

    useEffect( () => {
        function handleLoginChange(userLogedIn) {
            if (userLogedIn) {
                refetch();
            }
        }
    });

    const something = () => {
        logOutUser();
        openLoginModal();
    };

    return(
        <div>
            <h1>ISFIT 2021</h1>
            <p> { errorMessage } </p>
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