import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PositionsModule from "../components/positionsModule";
import PageLayout from "./pageLayout";
import PositionChoiceBox from "../components/positionChoiceBox";
import TextBox from "../components/textBoxModule";
import {openLoginModal} from "../redux/actions";
import {getLoginModalState, getUserAuthKey, getUserLogedIn} from "../redux/selectors";
import {connect} from "react-redux";


const LandingPage = ({userLogedIn, showLoginModal, openLoginModal, userAuthKey})  => {
  const history = useHistory();
  const [sectionList, setSectionList] = useState([]);

  const updateSectionList = (sect) => {
    setSectionList(sect);
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="flex-grid-adaptive mb-3 pt-3">
          <TextBox>
            <h1 style={{textAlign:"center", color: "#983c2e"}}>ISFiT is recruiting!</h1>
            <div className="flex-grid flex-row">
              <img src="./Gråtekst_pa_gjennomsiktig.png" className='flex-sm-shrink-1 w-10 my-4 some-pic' alt="Tabler React" style={{width: '20vw', height: 'auto'}}></img>
              <p className="py-4 landing-text">
                We are looking for more motivated and excited students to join us! Whether you like to communicate through different media platforms, plan an event from start to end, book performers, handle the economy or organize, we have a position for you!
                ISFiT is much more than just a festival. We gather international students from different backgrounds for discussions and debates. In addition, we have a wide Cultural Program that you can benefit from as a student or citizen of Trondheim. To make this happen, we need people like you to join us!
                Apply before the 31th of August for a chance to gain new skills, meet other volunteers and get the experience of a lifetime!
              </p>
            </div>
          </TextBox>
        </div>
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title px-1">Choose positions</h4>
        </div>
        <div className="flex-grid-adaptive">
          <div className="position-box-left">
            <PositionsModule sectionList={sectionList} />
          </div>
          <div className="shopping-box-right">
            <PositionChoiceBox />
            {  userLogedIn ? <button
                className="btn btn-continue mt-1 mr-2 float-right"
                onClick={() => history.push("/enterapplication")}
              > Continue</button> :
              <button className="btn btn-success"  onClick={ () => openLoginModal() }>Sign in to continue the application proccess
              </button>}
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
