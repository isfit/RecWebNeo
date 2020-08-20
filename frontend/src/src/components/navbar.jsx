import React from "react";
import NavBarButton from "./navbarbutton";

import { useQuery, gql } from "@apollo/client";
import { ME_NAME } from "../requests/userRequests";

import { connect } from "react-redux";
import { openLoginModal } from "../redux/actions";
import { getLoginModalState, getUserLogedIn, getUserAuthKey } from "../redux/selectors";


  const RenderProfile = () => {
    const { loading, error, data } = useQuery(ME_NAME);
    if (data == null) {
      return <div></div>;
    }

    return (
        <a href="/myprofile">
          <span className="ml-2 d-none d-lg-block">
            <span className="text-default"> { data.me?.firstName } { data.me?.lastName} </span>
            <small className="text-muted d-block">Applicant</small>
          </span>
        </a>  
    );
  } 

  const NavBar = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey}) => {

    return (
      <div className="header py-1 border-bottom">
        <div className="container">
          <div className="flex-grid" style={{alignItems:"center"}}>
            <div className="col">
                <a className="header-brand" href="/">
                  <img src="./isfitlogo.png" className="header-brand-img" alt="Tabler React" style={{ maxWidth: "70px" }}></img>
                  <span className="d-none d-md-inline ml-2">RECRUITMENT</span>
                </a>
            
            </div>
            <div className="col">
                <ul className="nav" style={{justifyContent:"right"}}>
                  <NavBarButton title="Overview" iconstring="list-ol" address="/" />
                  { userLogedIn ? <NavBarButton title="My application" iconstring="address-card" address="/myapplication" /> : null}
                  { userLogedIn ? <NavBarButton title="My Profile" iconstring="address-card" address="/myprofile" /> : null}
                  <div>
                  {
                    userLogedIn ? <RenderProfile userAuthKey={userAuthKey} /> : <button className="btn btn-outline-primary" onClick={ () => openLoginModal() }>Sign in</button>
                  }
                  </div>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }


  const mapStateToProps = state => {
    return {
      showLoginModal: getLoginModalState(state),
      userLogedIn: getUserLogedIn(state),
      userAuthKey: getUserAuthKey(state)
    };
  };

export default connect(mapStateToProps, { openLoginModal })(NavBar);
