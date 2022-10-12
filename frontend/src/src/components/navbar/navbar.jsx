import React, {useState} from "react";
import { connect } from "react-redux";
import { openLoginModal } from "../../redux/actions";
import { getLoginModalState, getUserLogedIn, getUserAuthKey } from "../../redux/selectors";

import NavBarButton from "./navbarbutton";
import NavBarButtonConsistent from "./navbarbutton";
import NavbarProfileIcon from './navbarProfileIcon';
import NavbarMyApplicationButton from './narbarMyApplicationButton';
import Burger from './burger';
import { getRolesFromToken, getAccessLevel } from './navbarHelperFunctions';
import "../../stylesheets/components/navbar/navbar.css";



const NavBar = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey}) => {
  const RolesArray = getRolesFromToken(userAuthKey);
  const AccessLevel = getAccessLevel(RolesArray);

  const [overlay, setOverlay] = useState(false);

  const activateSideBar = (event) => {
    const navBar = document.getElementById("sideNavBar");
    if (navBar.className === "nav navbar-tabs") {
        navBar.className += " nav-active"
        setOverlay(true)
    } else{
        navBar.className = "nav navbar-tabs"
        setOverlay(false)
    }
  };


  return (
    <div className="header border-bottom">
      <div className="container pt-2" >
        <div className="flex-grid" style={{alignItems:"center", justifyContent:"space-between"}}>
              <div className="flex-grid" style={{alignItems:"center"}}>
              <a href="/">
                <img src="./isfitlogo.png" className="header-brand-img" alt="ISFiT Logo" style={{ maxWidth: "100px" }}></img>
                {/* <span className="d-none d-md-inline ml-4" style={{color: "#ED7F66"}}>RECRUITMENT</span> */}
              </a>
              </div>
              <div className="flex-grid" style={{alignItems:"center"}}>
                { userLogedIn ? <NavbarProfileIcon accessLevel={AccessLevel} /> : <button className="btn btn-outline-success"  onClick={ () => openLoginModal() }>Sign in</button> }
              </div>
        </div>
        <div className="flex-grid" style={{justifyContent:"flex-end"}}>
          {userLogedIn ? <div className="pt-2"><Burger activateSideBar={activateSideBar} /></div> : null}
        </div>
        <div className="flex-grid pt-1 pb-2" style={{alignItems:"center", justifyContent:"space-around"}}>
              { (userLogedIn && (AccessLevel === 1)) ? 
                  <ul className="nav navbar-tabs" id={"sideNavBar"}>
                    <NavBarButton title="Overview" iconstring="list-ol" address="/"/>
                    <NavbarMyApplicationButton />
                    <NavBarButton title="My Interviews" iconstring="user-tie" address="/myinterviews" />
                  </ul>
                 :
                 null 
              }
              { (userLogedIn && (AccessLevel > 1)) ? <ul className="nav navbar-tabs" id={"sideNavBar"}>
                <NavBarButton title="Overview" iconstring="list-ol" address="/" />
                <NavBarButton title="My Interviews" iconstring="user-tie" address="/myinterviews" />
                <NavBarButton title="Unavailable hours" iconstring="calendar-times" address="/unavailabletimes" />
                <NavBarButton title="Applications" iconstring="file-alt" address="/applications" />
                { AccessLevel > 2 ? <NavBarButton title="All Interviews" iconstring="users" address="/allinterviews" /> : null}
                { AccessLevel > 3 ? <NavBarButton title="Manage interviews" iconstring="users-cog" address="/manageinterviews" /> : null}
                { AccessLevel > 3 ? <NavBarButton title="Administer users" iconstring="tasks" address="/useradminpage" /> : null}
              </ul> : null }
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
