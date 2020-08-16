import React, { useState } from 'react';
import NavBar from '../components/navbar';
import Positions from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';

import LogInModal from '../components/modal/loginmodal';

import "../stylesheets/pages/flexgrid.css";


const MyProfilePage = (props) => {

    return (
        <div className="page">
            <div className="page-main">
              <NavBar showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal } />
              <LogInModal showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal } />
              <div className="page-content bg-light">
                <div className="container w-50">
                  <div className="flex-grid py-5">
                    <div className="col">
                        <img className="w-100" src='/profilepic.png' alt="Logo" />
                    </div>
                    <div className="col">
                        <div className="card h-100 py-3 px-3">
                            <span>Name</span>
                            <h5>Torstein Otterlei</h5>
                            <span>E-mail</span>
                            <h5>torstein@otterlei.no</h5>
                            <span>Number</span>
                            <h5>91736801</h5>
                            <button className="mt-5">Edit information</button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );

};


export default MyProfilePage;