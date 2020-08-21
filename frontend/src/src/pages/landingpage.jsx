import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PositionsModule from "../components/positionsModule";
import PageLayout from "./pageLayout";
import PositionChoiceBox from "../components/positionChoiceBox";
import TextBox from "../components/textBoxModule";

const LandingPage = () => {
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
            <h1 style={{textAlign:"center"}}>ISFiT is recruiting!</h1>
            <p style={{textAlign:"center"}}>
              We are looking for more motivated and excited students to join us! Whether you like to communicate through different media platforms, plan an event from start to end, book performers, handle the economy or organize, we have a position for you! 
              ISFiT is much more than just a festival. We gather international students from different backgrounds for discussions and debates. In addition, we have a wide Cultural Program that you can benefit from as a student or citizen of Trondheim. To make this happen, we need people like you to join us! 
              Apply before the 31th of August for a chance to gain new skills, meet other volunteers and get the experience of a lifetime!
            </p>
          </TextBox>
        </div>
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Choose positions</h4>
        </div>
        <div className="flex-grid-adaptive">
          <div className="position-box-left">
            <PositionsModule sectionList={sectionList} />
          </div>
          <div className="shopping-box-right">
            <PositionChoiceBox />
            <button
              className="btn btn-outline-success mt-1 mr-2 float-right"
              onClick={() => history.push("/enterapplication")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LandingPage;
