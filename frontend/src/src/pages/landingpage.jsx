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
    setSectionList(sect);
  }

    return (
        <PageLayout>
          <div className="container">
            <div className="page-header pt-3 mb-4">
              <h4 className="page-title">Choose positions</h4>
            </div>
            <div className="row">
              <div className="col">
              <PositionTable sectionList={sectionList} />
              </div>
              <div className="col col-lg-4">
                <PositionChoiceBox />
                <button className="btn btn-outline-success mt-1 mr-2 float-right" onClick={() => history.push("/enterapplication")}>Continue</button>
              </div>
            </div>
          </div>
        </PageLayout>
    );
};




export default LandingPage;