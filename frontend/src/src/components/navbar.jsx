import React from "react";
import NavBarButton from "./navbarbutton";

import { useQuery, gql } from "@apollo/client";
import { ME_NAME } from "../requests/userRequests";

import { connect } from "react-redux";
import { openLoginModal } from "../redux/actions";
import { getLoginModalState, getUserLogedIn, getUserAuthKey } from "../redux/selectors";

import { MYAPPLICATION } from "../requests/userRequests";


  const RenderProfile = ({accessLevel}) => {
    const { loading, error, data } = useQuery(ME_NAME, {fetchPolicy: "no-cache"},);
    if (data == null) {
      return <div></div>;
    }

    let RoleName = "Applicant";
    switch(accessLevel){
      case 4: RoleName = "Super user"; break;
      case 3: RoleName = "Admin / Leader in ISFiT"; break;
      case 2: RoleName = "ISFiT Member"; break;
    }

    return (
        <a href="/myprofile">
          <span className="ml-2 d-none d-lg-block">
            <span className="text-default"> { data.me?.firstName } { data.me?.lastName} </span>
            <small className="text-muted d-block">{RoleName}</small>
          </span>
        </a>  
    );
  }

  const RenderMyApplicationButton = () => {
    const myApplicationData = useQuery(MYAPPLICATION, {fetchPolicy: "no-cache"},);
    const userHasApplication = Boolean(myApplicationData?.data?.myApplication);

    if (userHasApplication) {
      return (<NavBarButton title="n" iconstring="address-card" address="/myapplication" />);
    }

    return (
      <div></div>
    );
  };

  const GetRolesFromToken = (token) => {
    if (!Boolean(token)){
      return [];
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let Roles = JSON.parse(jsonPayload)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    let hasRole = Boolean(Roles)

    return hasRole ? Roles : [] ;
  };

  const getAccessLevel = (RolesArray) => {
    if (RolesArray.includes("superuser")) {return 4;}
      else if (RolesArray.includes("admin")) {  return 3; }
      else if (RolesArray.includes("insider")) { return 2 ;}
      else { return 1;}
  }

  const NavBar = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey}) => {
    const RolesArray = GetRolesFromToken(userAuthKey);
    const AccessLevel = getAccessLevel(RolesArray);
    

    return (
      <div className="header py-1 border-bottom py-2">
        <div className="container">
          <div className="flex-grid" style={{alignItems:"center"}}>
            <div>
                <a className="header-brand" href="/">
                  <img src="./Gråtekst_pa_gjennomsiktig.png" className="header-brand-img" alt="Tabler React" style={{ maxWidth: "70px" }}></img>
                  <span className="d-none d-md-inline ml-4" style={{color: "#ED7F66"}}>RECRUITMENT WEB</span>
                </a>
            </div>
            <div className="col">
                <ul className="nav" style={{justifyContent:"right"}}>
                  <NavBarButton title="Overview" iconstring="list-ol" address="/" />
                  { userLogedIn ? <RenderMyApplicationButton /> : null }
                  { AccessLevel > 2 ? <NavBarButton title="Manage interviews" iconstring="users" address="/manageinterviews" /> : null}
                  { AccessLevel > 2 ? <NavBarButton title="View Applications" iconstring="file-alt" address="/applications" /> : null}
                  { AccessLevel > 2 ? <NavBarButton title="Administer users" iconstring="arrow-up" address="/useradminpage" /> : null}
                  {/* { userLogedIn ? <NavBarButton title="My Profile" iconstring="address-card" address="/myprofile" /> : null} */}

                  <div>
                  { userLogedIn ? <RenderProfile accessLevel={AccessLevel} /> : <button className="btn btn-outline-success"  onClick={ () => openLoginModal() }>Sign in</button> }
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
