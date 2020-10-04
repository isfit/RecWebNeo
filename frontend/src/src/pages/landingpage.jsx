import React, { useState } from "react";
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

const LandingPage = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey})  => {
  const history = useHistory();
  const [sectionList, setSectionList] = useState([]);

  const myApplicationData = useQuery(MYAPPLICATION, {fetchPolicy: "no-cache"});
  const userHasApplication = Boolean(myApplicationData?.data?.myApplication);

  const updateSectionList = (sect) => {
    setSectionList(sect);
  };

  function chocieBoxButton(){
    if (userHasApplication){
      return (<button className="btn btn-success ml-0 w-100">You already have entered an application. Thank you!</button>)
    }else if (userLogedIn){
      return ( <button className="btn btn-continue mt-1 mr-2 float-right" onClick={() => history.push("/enterapplication")}> Continue</button>)
    }else {
      return (<button className="btn btn-success ml-0 w-100"  onClick={ () => openLoginModal() }>Sign in to continue the application proccess</button>)
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
                  <div className="pt-4">
                    <h1 style={{textAlign:"center", color: "#983c2e"}}>ISFiT is Recruiting</h1>
                    <p className="mb-1" style={{textAlign:"center"}}>We are looking for more motivated and excited students to join us.</p>
                    <p className="mb-0" style={{textAlign:"center"}}>
                      ISFiT is much more than just a festival. We gather international students from different backgrounds for discussions and debates. 
                      In addition, we have a wide Cultural Program that you can benefit from as a student or citizen of Trondheim.
                    </p>
                    <p style={{textAlign:"center"}}>To make this happen, we need people like you! Apply now!</p>
                    {/* <h1 style={{textAlign:"center", color: "#983c2e"}}>Applications are closed</h1>
                    <p className="mb-1" style={{textAlign:"center"}}>Sadly, this recruitment period is over, but we are not done recruiting just yet.</p>
                    <p style={{textAlign:"center"}}>Stay tuned to apply for ISFiT 21 in our next recruitment period!</p> */}
                  </div>
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
            <PositionChoiceBox />
            {chocieBoxButton()}
            {/* <button className="btn btn-success ml-0 w-100" >Application period is over</button> */}
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
    userAuthKey: getUserAuthKey(state)
  };
};


export default  connect(mapStateToProps, { openLoginModal })(LandingPage);
