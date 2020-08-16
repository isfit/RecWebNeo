import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarButton from "./navbarbutton";

import "../stylesheets/pages/flexgrid.css";


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

  const NavBar = (props) => {
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
                  <img src='/profilepic.png' style={{borderRadius: "50%", maxHeight: "5%", maxWidth:"8%"}} alt="Image" />
                  <RenderProfile />
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }




export default NavBar;
