import React, { useState } from 'react';
import PositionRow from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';
import PageLayout from './pageLayout';
import PositionChoicBox from '../components/positionChoiceBox';

const LandingPage = (props) => {

    return (
        <PageLayout userLogedIn={ props.userLogedIn }  setUserLogedIn={ userLoginValue => props.setUserLogedIn(userLoginValue) }>
          <div className="container">
            <div className="page-header pt-3 mb-4">
              <h4 className="page-title">Choose positions</h4>
            </div>
            <div className="row">
              <div className="col">
              <SearchModule />
              <PositionRow />
              </div>
              <div className="col col-lg-4">
                <PositionChoicBox />
              </div>
            </div>
          </div>
        </PageLayout>
    );
};



export default LandingPage;