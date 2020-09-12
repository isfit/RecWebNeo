import React,{useState} from 'react';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';

import "../stylesheets/pages/flexgrid.css";

import { useQuery, useMutation } from "@apollo/client";
import { ME, UPDATE_MY_PASSWORD, EDIT_USER_INFORMATION } from "../requests/userRequests";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../redux/actions";
import { getUserLogedIn } from "../redux/selectors";


const EditPassword = ({setCurrentPassword, setChosenPassword}) => {
  return (
    <div className="flex-grid mt-3 w-50" style={{flexDirection:"column", margin:"auto"}}>
      <span>Enter old password:</span>
      <input type="text" onChange={e => setCurrentPassword(e.target.value) }/>
      <span>Enter new password:</span>
      <input type="text" onChange={e => setChosenPassword(e.target.value) }/>
    </div>
  );
};


const EditProfile = ({setNewFirstName, setNewLastName, setNewPhoneNumber}) => {
  return(
    <div className="flex-grid mt-3 w-50" style={{flexDirection:"column", margin:"auto"}}>
      <span>The fields you leave blank will not be changed.</span>
      <span>First name</span>
      <input type="text" placeholder="Enter new name" onChange={e => setNewFirstName(e.target.value) }/>
      <span>Last name</span>
      <input type="text" placeholder="Enter new name" onChange={e => setNewLastName(e.target.value) }/>
      <span>Phone Number</span>
      <input type="text" placeholder="Enter phonenumber" onChange={e => setNewPhoneNumber(e.target.value) }/>
    </div>
  );
};



const MyProfilePage = ({logOutUser}) => {

    const { refetch, loading, error, data } = useQuery(ME);
    const history = useHistory();

    const LogOutAndRedirect = () => {
      logOutUser();
      history.push("/");
    };

    const [updatePassword, updatePasswordData] = useMutation(UPDATE_MY_PASSWORD);
    const [editUserInformation, editUserInformationData] = useMutation(EDIT_USER_INFORMATION);

    const [chosenPassword, setChosenPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    
    const [editPasswordMode, setEditPasswordMode] = useState(false);
    const [editProfileMode, setEditProfileMode] = useState(false);

    let phoneNumber = Boolean(data?.me.phoneNumber) ? data?.me.phoneNumber : "No phonenumber registered";

    const changePassword = (chosenPassword, currentPassword) => {
      if (!(chosenPassword === "")){
        updatePassword({variables:{input: {newPassword: chosenPassword, oldPassword: currentPassword}}});
      };
      setEditPasswordMode(false);
    };

    const editProfile = (newFirstName, newLastName, newPhoneNumber) => {
      let inputDictionary = {};

      if (newFirstName) inputDictionary["firstName"] = newFirstName;
      if (newLastName) inputDictionary["lastName"] = newLastName ;
      if (newPhoneNumber) inputDictionary["phoneNumber"] = newPhoneNumber ;

      editUserInformation({variables:{input: inputDictionary}})
      setEditProfileMode(false);
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

    return (
        <PageLayout>
          <div className="container">
            <div className="flex-grid py-4 px-5" style={{justifyContent:"center", flexDirection:"column"}}>
                <div className="flex-grid" style={{justifyContent:"center"}}>
                  <div className="card py-3 px-3" style={{width:"30rem", textAlign:"center", display:"flex", alignContent:"center"}}>

                      { editProfileMode || editPasswordMode ? null : <div>
                        <h2 className="mb-4"> { data.me.firstName } { data.me.lastName } </h2>
                        <span>Email</span>
                        <h5>{ data.me.email }</h5>
                        <span>Phone number</span>
                        <h5>{phoneNumber}</h5>
                      </div>}

                      {updatePasswordData?.data?.updateMyPassword ? <small className="text-success">Your password was updated successfully.</small> : null}
                      {Boolean(updatePasswordData?.error) ? <small className="text-danger">There was something wrong when trying to update your password: {updatePasswordData?.error?.message}</small> : null}


                      { editPasswordMode ? <EditPassword setCurrentPassword={setCurrentPassword} setChosenPassword={setChosenPassword} /> : null }
                      { editProfileMode ? <EditProfile setNewFirstName={setNewFirstName} setNewLastName={setNewLastName} setNewPhoneNumber={setNewPhoneNumber} /> : null }

                      <div className="flex-grid mt-5" style={{justifyContent:"space-between"}}>
                        <div>
                          { editProfileMode || editPasswordMode ? null : <button className="btn btn-secondary" onClick={() => setEditPasswordMode(true)}>Change password</button> }
                          { editProfileMode || editPasswordMode ? null : <button className="btn btn-secondary ml-1" onClick={() => setEditProfileMode(true)}>Edit Profile</button> }
                        </div>
                        <div>
                          { editPasswordMode || editProfileMode ? null :  <button className="btn btn-danger" onClick={() => LogOutAndRedirect()}>Log out</button>}
                          { editPasswordMode ? <div><button className="btn btn-secondary" onClick={() => setEditPasswordMode(false)}>Cancel</button><button className="btn btn-success ml-1" onClick={() => changePassword(chosenPassword, currentPassword)}>Confirm</button></div> : null}
                          { editProfileMode ? <div><button className="btn btn-secondary" onClick={() => setEditProfileMode(false)}>Cancel</button><button className="btn btn-success ml-1" onClick={() => editProfile(newFirstName, newLastName, newPhoneNumber)}>Confirm</button></div> : null}
                        </div>
                      </div>
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