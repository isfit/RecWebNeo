import React from "react";
import { connect } from "react-redux";
import { openLoginModal } from "../../redux/actions";
import { getLoginModalState, getUserLogedIn, getUserAuthKey } from "../../redux/selectors";

import NavBarButton from "./navbarbutton";
import NavbarProfileIcon from './navbarProfileIcon';
import NavbarMyApplicationButton from './narbarMyApplicationButton';
import { getRolesFromToken, getAccessLevel } from './navbarHelperFunctions';


const NavBar = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey}) => {
  const RolesArray = getRolesFromToken(userAuthKey);
  const AccessLevel = getAccessLevel(RolesArray);

  return (
    <div className="header py-1 border-bottom py-2">
      <div className="ml-4">
        <div className="flex-grid" style={{alignItems:"center"}}>
          <div>
              <a className="header-brand" href="/">
                <img src="./Gråtekst_pa_gjennomsiktig.png" className="header-brand-img" alt="Tabler React" style={{ maxWidth: "70px" }}></img>
                <span className="d-none d-md-inline ml-4" style={{color: "#ED7F66"}}>RECRUITMENT WEB</span>
              </a>
          </div>
          <div className="col">
              <ul className="nav" style={{justifyContent:"right", width: "100%"}}>
                <NavBarButton title="Overview" iconstring="list-ol" address="/" />
                { (userLogedIn && (AccessLevel === 1)) ? <NavbarMyApplicationButton /> : null }
                { userLogedIn ? <NavBarButton title="My Interviews" iconstring="user-tie" address="/myinterviews" /> : null}
                { AccessLevel > 2 ? <NavBarButton title="All Interviews" iconstring="users" address="/allinterviews" /> : null}
                { AccessLevel > 2 ? <NavBarButton title="Manage interviews" iconstring="users-cog" address="/manageinterviews" /> : null}
                { AccessLevel > 1 ? <NavBarButton title="View Applications" iconstring="file-alt" address="/applications" /> : null}
                { AccessLevel > 1 ? <NavBarButton title="Unavailable hours" iconstring="calendar-times" address="/unavailabletimes" /> : null}
                { AccessLevel > 2 ? <NavBarButton title="Administer users" iconstring="tasks" address="/useradminpage" /> : null}
                <div>
                { userLogedIn ? <NavbarProfileIcon accessLevel={AccessLevel} /> : <button className="btn btn-outline-success"  onClick={ () => openLoginModal() }>Sign in</button> }
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
