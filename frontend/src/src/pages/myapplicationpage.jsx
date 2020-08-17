import React, { useState } from 'react';
import PositionsBox from '../components/positionsbox';
import PageLayout from './pageLayout';

const MyApplicationPage = (props) => {
    const [text, changeText] = useState('');
    { console.log(text) }

    return (
      <PageLayout userLogedIn={ props.userLogedIn }  setUserLogedIn={ userLoginValue => props.setUserLogedIn(userLoginValue) }>
        <div className="container">
          <div className="page-header pt-3 mb-4">
            <h4 className="page-title">My application</h4>
          </div>
          <div className="row">
            <div className="col">
              <textarea readOnly="true" className="w-100 h-100" placeholder="My application text" type="text"></textarea>
            </div>
            <div className="col col-lg-4">
              <PositionsBox />
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
            </div>
          </div>
        </div>
      </PageLayout>
    );
};



export default MyApplicationPage;