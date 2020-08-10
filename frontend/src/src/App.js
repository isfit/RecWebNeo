import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';

import NavBar from './components/navbar';
import Positions from './components/positions';
import SearchModule from './components/searchmodule';
import ShoppingCart from './components/shoppingcart';





class App extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="page">
        <div className="page-main">
          <NavBar />
          <div className="page-content bg-light">
            <div className="container">
              <div className="page-header mt-3 mb-4">
                <h4 className="page-title">Choose positions</h4>
              </div>
              <div className="row">
                <div className="col">
                <SearchModule />
                <Positions />
                </div>
                <div className="col col-lg-4">
                  <ShoppingCart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
