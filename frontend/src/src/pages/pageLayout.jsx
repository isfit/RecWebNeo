import React, { useState } from 'react';
import NavBar from '../components/navbar';
import LogInModal from '../components/modal/loginmodal';

const PageLayout = (props) => {

    return(
        <div className="page">
          <div className="page-main">
            <NavBar showingLogInModal={ !props.userLogedIn }  showLogInModal={ showModal => props.setUserLogedIn(!showModal) } />
            <LogInModal showModal={ !props.userLogedIn }  setShowModal={showModal => props.setUserLogedIn(!showModal)} />
            <div className="page-content bg-light">
                { props.children }
            </div>
          </div>
      </div>
    )
};

export default PageLayout;