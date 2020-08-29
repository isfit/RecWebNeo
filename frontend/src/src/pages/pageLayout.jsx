import React from 'react';
import NavBar from '../components/navbar/navbar';
import LogInModal from '../components/modal/loginmodal';

const PageLayout = (props) => {

    return(
        <div className="page">
          <div className="page-main">
            <NavBar showingLogInModal={ !props.userLogedIn }  showLogInModal={ showModal => props.setUserLogedIn(!showModal) } />
            <LogInModal />
            <div className="page-content">
                { props.children }
            </div>
          </div>
      </div>
    )
};

export default PageLayout;