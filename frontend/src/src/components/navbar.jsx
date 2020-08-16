import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarButton from "./navbarbutton";

import "../stylesheets/pages/flexgrid.css";

import { connect } from "react-redux";
import { setLoginModal } from "../redux/actions";
import { getLoginModalState, getUserLogedIn } from "../redux/selectors";


  const RenderProfile = () => {
    return (
        <a href="/myprofile">
          <span className="ml-2 d-none d-lg-block">
            <span className="text-default">Torstein Otterlei</span>
            <small className="text-muted d-block">Administrator</small>
          </span>
        </a>
    );
  } 

  const NavBar = ({userLogedIn, showLoginModal, setLoginModal}) => {

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
                  <NavBarButton title="My application" iconstring="address-card" address="/myapplication" />
                  <div>

                  {
                    userLogedIn ? <RenderProfile /> : <button className="btn btn-outline-primary" onClick={ () => setLoginModal(true) }>Sign in</button>
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
    userLogedIn: getUserLogedIn(state)
  };
};

export default connect(mapStateToProps, { setLoginModal })(NavBar);
