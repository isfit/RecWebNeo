import React,{useState} from 'react';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';

import "../stylesheets/pages/flexgrid.css";

import { useQuery, useMutation } from "@apollo/client";
import { ME, UPDATE_MY_PASSWORD} from "../requests/userRequests";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../redux/actions";
import { getUserLogedIn } from "../redux/selectors";


const MyProfilePage = ({logOutUser}) => {

    const { refetch, loading, error, data } = useQuery(ME);
    const history = useHistory();

    const LogOutAndRedirect = () => {
      logOutUser();
      history.push("/");
    };

    const [updatePassword, updatePasswordData] = useMutation(UPDATE_MY_PASSWORD);

    const [showPasswordbox, setShowPasswordbox] = useState(false);
    const [chosenPassword, setChosenPassword] = useState("");
    const [currentPassword,setCurrentPassword] = useState("");
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(null);

    const changePassword = (chosenPassword, currentPassword) => {
      if (!(chosenPassword === "")){
        console.log("SENDING PASSWORD QUERY",chosenPassword,currentPassword)
        console.log("OLD PASSWORD",currentPassword)
        console.log("NEW PASSWORD",chosenPassword)
        updatePassword({variables:{input: {newPassword: chosenPassword, oldPassword: currentPassword}}});
        console.log("QUERY DATA: ",updatePasswordData?.data)
      }
      setUpdatePasswordSuccess(updatePasswordData?.data?.updateMyPassword === true)
    };


    if (loading) {
      return (
        <div>Loading</div>
      )
    }

    if (error != null) {
      return (
        <PageLayout>
          <ErrorPage 
            errorMessage={"The current user is not authorized to access this resource."}
            errorType={"AuthenticationError"}
            refetch={() => refetch()}
          />
        </PageLayout>
      )
    }

    if (updatePasswordData?.error != null) {
      return (
        <PageLayout>
          <ErrorPage 
            errorMessage={"Error when trying to change password "}
            errorType={"AuthenticationError"}
            refetch={() => refetch()}
          />
        </PageLayout>
      )
    }

    return (
        <PageLayout>
          <div className="container w-50">
            <div className="flex-grid py-5">
              <div className="col">
                  <img className="w-100" src='/profilepic.png' alt="Logo" />
              </div>
              <div className="col">
                  <div className="card h-100 py-3 px-3">
                      <span>Name</span>
                      <h5> { data.me.firstName } { data.me.lastName } </h5>
                      <span>E-mail</span>
                      <h5>{ data.me.email }</h5>
                      <span>Phone Number</span>
                      <h5>{ data?.me.phoneNumber }</h5>
                      {showPasswordbox ? <div><div><span>Enter old password:</span><input type="text" onChange={e => setCurrentPassword(e.target.value) }/></div><span>Enter new password:</span><input type="text" onChange={e => setChosenPassword(e.target.value) }/><button className="mt-5" onClick={() => changePassword(chosenPassword, currentPassword)}>Set password</button></div> : <button className="mt-5" onClick={() => setShowPasswordbox(true)}>Change password</button> }
                      {updatePasswordSuccess === true ? <span>Password changed successfully</span> : null}
                      {updatePasswordSuccess === false ? <span>Failure when trying to change password</span> : null}
                      <button className="mt-5" onClick={() => LogOutAndRedirect()}>Log out</button>
                  </div>
              </div>
            </div>
          </div>
        </PageLayout>
    );

};

const mapStateToProps = state => {
  return {
    userLogedIn: getUserLogedIn(state),
  };
};

export default connect(mapStateToProps, { logOutUser })(MyProfilePage);