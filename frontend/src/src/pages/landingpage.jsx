import React, { useState } from 'react';
import PositionTable from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';
import PageLayout from './pageLayout';
import PositionChoiceBox from '../components/positionChoiceBox';


const LandingPage = () => {
    const [sectionList, setSectionList] = useState([]);

    return (
        <PageLayout>
          <div className="container">
            <div className="page-header pt-3 mb-4">
              <h4 className="page-title">Choose positions</h4>
            </div>
            <div className="row">
              <div className="col">
              <SearchModule sectionList={sectionList} setSectionList={setSectionList}/>
              <PositionTable sectionList={sectionList} />
              </div>
              <div className="col col-lg-4">
                <PositionChoiceBox />
                <a className="btn btn-outline-success mt-1 mr-2 float-right" href="/enterapplication">Continue</a>
              </div>
            </div>
          </div>
        </PageLayout>
    );
};




export default LandingPage;