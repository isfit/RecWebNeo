import React from 'react';
import NavBar from '../components/navbar/navbar';
import LogInModal from '../components/modal/loginmodal';

const PageLayout = (props) => {

    return(
        <div className="page">
          <div className="page-main">
            <NavBar showingLogInModal={ !props.userLogedIn }  showLogInModal={ showModal => props.setUserLogedIn(!showModal) } />
            <LogInModal />
            <div className="page-content pb-3" style={{minHeight: "730px"}}>
                { props.children }
            </div>
          </div>
          <footer className="py-3">
              <div className="container">
                <div className="flex-grid" style={{justifyContent:"space-between"}}>
                  <small className="text-muted">ISFiT 2021 Recruitment Website</small>
                  <small className="text-muted">For questions or problems please send email to or.it.recruitmentweb@isfit.no</small>
                </div>
              </div>
          </footer>
      </div>
    )
};

export default PageLayout;