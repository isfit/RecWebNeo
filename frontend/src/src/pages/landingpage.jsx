import React, { useState } from 'react';

import NavBar from '../components/navbar';
import PositionRow from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';

import LogInModal from '../components/modal/loginmodal';



const LandingPage = (props) => {

    return (
        <div className="page">
          <div className="page-main">
            <NavBar showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal } />
            <LogInModal />
            <div className="page-content bg-light">
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
                    <ShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};



export default LandingPage;