import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { openLoginModal, logOutUser } from "../redux/actions";
import { getUserLogedIn } from "../redux/selectors";

const ErrorPage = ( { errorMessage, errorType, refetch, userLogedIn, logOutUser, openLoginModal } ) => {

    const history = useHistory();

    const something = () => {
        logOutUser();
        history.push("/");
    };

    return(
        <div>
            <h1>ISFIT 2021</h1>
            <p>{errorMessage}</p>
            <p> You are not authorized to access this resource. </p>
            <p> Please go pack to the front page and sign in :) </p>
            <button onClick={() => something() }>Back</button>
        </div>
    )
}


const mapStateToProps = state => {
    return {
      userLogedIn: getUserLogedIn(state),
    };
  };
  
export default connect(mapStateToProps, { openLoginModal, logOutUser })(ErrorPage);