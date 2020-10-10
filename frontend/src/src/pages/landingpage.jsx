import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PositionsModule from "../components/positionsModule";
import PageLayout from "./pageLayout";
import PositionChoiceBox from "../components/positionChoiceBox";
import TextBox from "../components/textBoxModule";
import {openLoginModal} from "../redux/actions";
import {getLoginModalState, getUserAuthKey, getUserLogedIn} from "../redux/selectors";
import {connect} from "react-redux";
import { MYAPPLICATION } from "../requests/userRequests";
import { useQuery } from "@apollo/client";
import { GET_ADMISSION_PERIODS } from  "../requests/orgRequests";
import { getAppliedPositions } from "../redux/selectors";
import Countdown from 'react-countdown';
import { getRolesFromToken, getAccessLevel } from '../components/navbar/navbarHelperFunctions';

const ChocieBoxButton = ({userHasApplication, positions, currentTime, endTime, userLogedIn, startTime, AccessLevel, history}) => {
  if (userHasApplication){
    return (<button className="btn btn-light ml-0 w-100" style={{backgroundColor:"#40B4A3", color:"white"}}>You have already submitted an application. Thank you!</button>)
  }else if (AccessLevel > 1){
    return (<button className="btn btn-light ml-0 w-100" style={{backgroundColor:"#40B4A3", color:"white"}}>You are already part of ISFiT!</button>)
  }else if (currentTime > endTime || currentTime < startTime){
    return (<button className="btn btn-light ml-0 w-100" style={{backgroundColor:"#40B4A3", color:"white"}}>Applications are closed</button>)
  }else if (userLogedIn){
    return ( <div style={{position:"sticky", top:"10px"}}><PositionChoiceBox /> { (positions.length < 1) ? <button className="btn btn-light ml-0 w-100" style={{backgroundColor:"#40B4A3", color:"white"}}>Please add at least one position to continue</button> : <button className="btn btn-continue mt-1 float-right" onClick={() => history.push("/enterapplication")}> Continue</button> }</div>)
  }else {
    return (<button className="btn btn-light ml-0 w-100" style={{backgroundColor:"#40B4A3", color:"white"}} onClick={ () => openLoginModal() }>Sign in to continue the application proccess</button>)
  }
}


const LandingPage = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey, positions, positionsUpdated})  => {
  const RolesArray = getRolesFromToken(userAuthKey);
  const AccessLevel = getAccessLevel(RolesArray);

  const history = useHistory();
  const [sectionList, setSectionList] = useState([]);

  const myApplicationData = useQuery(MYAPPLICATION, {fetchPolicy: "no-cache"});
  let userHasApplication = Boolean(myApplicationData?.data?.myApplication);

  const admissionPeriodData = useQuery(GET_ADMISSION_PERIODS);
  let endTime = new Date(admissionPeriodData?.data?.admisionPeriodes[0].endDate);
  let startTime  = new Date(admissionPeriodData?.data?.admisionPeriodes[0].startDate);
  let currentTime = new Date();

  const updateSectionList = (sect) => {
    setSectionList(sect);
  };


  useEffect(() => {
    myApplicationData.refetch();
  }, [userLogedIn]);

  function landingPageText(){
    if (currentTime > endTime){
      return(
        <div className="pt-5">
          <h1 style={{textAlign:"center", color: "#0099CC"}}>Applications are closed</h1>
          <p className="mb-1" style={{textAlign:"center"}}>Sadly, this recruitment period is over.</p>
          <p style={{textAlign:"center"}}>Stay tuned to apply for ISFiT in our next recruitment period!</p>
        </div>
      )
    } else if (currentTime < startTime){
      return(
        <div className="pt-4">
          <h1 style={{textAlign:"center", color: "#0099CC"}}>ISFiT is Recruiting</h1>
          <p className="mb-4" style={{textAlign:"center"}}>We are looking for more motivated and excited students to join us!</p>
          <p className="mb-1" style={{textAlign:"center"}}>Application opens {startTime.toString().slice(0, 21)} </p>
          <p style={{textAlign:"center", fontSize:"40px"}}><Countdown date={startTime}><span>Refresh the page to apply!</span></Countdown></p>
        </div>
      )
    }else{
      return (
        <div className="pt-4">
          <h1 style={{textAlign:"center", color: "#0099CC"}}>ISFiT is Recruiting</h1>
          <p className="mb-1" style={{textAlign:"center"}}>We are looking for more motivated and excited students to join us.</p>
          <p className="mb-0" style={{textAlign:"center"}}>
            ISFiT is much more than just a festival. We gather international students from different backgrounds for discussions and debates. 
            In addition, we have a wide Cultural Program that you can benefit from as a student or citizen of Trondheim.
          </p>
          <p style={{textAlign:"center"}}>To make this happen, we need people like you! Apply now!</p>
        </div>
      )
    }
  }
  

  return (
    <PageLayout>
      <div className="container main-container">
        <div className="flex-grid-adaptive mb-3 pt-3">
          <TextBox>
            <div className="flex-grid-adaptive">
              <div className="image-left">
                <img src="./Gråtekst_pa_gjennomsiktig.png" className='flex-sm-shrink-1 w-10 my-4 some-pic' alt="No image" style={{width: '100%', height: 'auto'}}></img>
              </div>
              <div className="text-right">
                <div className="flex-grid" style={{flexDirection:"column"}}>
                    {landingPageText()}
                 </div>
              </div>
            </div>
          </TextBox>
        </div>
        <div className="page-header">
          <h4 className="page-title px-1">Choose positions</h4>
        </div>
        <div className="flex-grid-adaptive">
  
            <div className="position-box-left">
              <PositionsModule sectionList={sectionList} />
            </div>
      

          <div className="shopping-box-right mt-4">
            {/* {chocieBoxButton()} */}
            <ChocieBoxButton userHasApplication={userHasApplication} positions={positions} currentTime={currentTime} endTime={endTime} userLogedIn={userLogedIn} startTime={startTime} AccessLevel={AccessLevel} history={history} />
          </div>


        </div>
      </div>
    </PageLayout>
  );
};


const mapStateToProps = state => {
  return {
    showLoginModal: getLoginModalState(state),
    userLogedIn: getUserLogedIn(state),
    userAuthKey: getUserAuthKey(state),
    positions: getAppliedPositions(state),
    positionsUpdated: state.application.positionsUpdated
  };
};


export default  connect(mapStateToProps, { openLoginModal })(LandingPage);
