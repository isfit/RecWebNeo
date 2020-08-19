import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PositionTable from '../components/positionsModule';
import SearchModule from '../components/searchModule';
import PageLayout from './pageLayout';
import PositionChoiceBox from '../components/positionChoiceBox';

const LandingPage = () => {
  const history = useHistory();
  const [sectionList, setSectionList] = useState([]);

  const updateSectionList = (sect) => {
    console.log("Section list", sect);
    setSectionList(sect);
  }

  console.log("Rerendering boiii", sectionList);

    return (
        <PageLayout>
          <div className="container">
            <div className="page-header pt-3 mb-4">
              <h4 className="page-title">Choose positions</h4>
            </div>
            <div className="row">
              <div className="col">
              <PositionTable sectionList={sectionList} />
              { console.log("Section list", sectionList) }
              </div>
              <div className="col col-lg-4">
                <PositionChoiceBox />
                <buton className="btn btn-outline-success mt-1 mr-2 float-right" onClick={() => history.push("/enterapplication")}>Continue</buton>
              </div>
            </div>
          </div>
        </PageLayout>
    );
};




export default LandingPage;