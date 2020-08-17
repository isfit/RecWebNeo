import React, { useState } from 'react';
import PositionTable from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';
import PageLayout from './pageLayout';


const LandingPage = () => {

    return (
        <PageLayout>
          <div className="container">
            <div className="page-header pt-3 mb-4">
              <h4 className="page-title">Choose positions</h4>
            </div>
            <div className="row">
              <div className="col">
              <SearchModule />
              <PositionTable />
              </div>
              <div className="col col-lg-4">
                <ShoppingCart />
              </div>
            </div>
          </div>
        </PageLayout>
    );
};




export default LandingPage;