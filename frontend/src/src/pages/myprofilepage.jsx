import React,{useState} from 'react';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';

import "../stylesheets/pages/flexgrid.css";

import { useQuery } from "@apollo/client";
import { ME } from "../requests/userRequests";

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

    const [showPasswordbox, setShowPasswordbox] = useState(false);
    const [chosenPassword, setChosenPassword] = useState("");

    const changePassword = (chosenPassword) => {
      console.log(chosenPassword)
      if (!(chosenPassword === "")){
        
      }
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
                      <h5>{ data?.me.birtDate }</h5>
                      {showPasswordbox ? <div><input type="text" onChange={e => setChosenPassword(e.target.value) }/><button className="mt-5" onClick={() => changePassword(chosenPassword)}>Set password</button></div> : <button className="mt-5" onClick={() => setShowPasswordbox(true)}>Change password</button> }
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