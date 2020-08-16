import React, { useState } from 'react';
import PositionsBox from '../components/positionsbox';
import PageLayout from './pageLayout';

const ApplicationTextPage = (props) => {
    const [text, changeText] = useState('');
    { console.log(text) }


    return (
      <PageLayout userLogedIn={ props.userLogedIn }  setUserLogedIn={ userLoginValue => props.setUserLogedIn(userLoginValue) }>
        <div className="container">
          <div className="page-header pt-3 mb-4">
            <h4 className="page-title">Enter application text</h4>
          </div>
          <div className="row">
            <div className="col">
              <textarea className="w-100 h-100" placeholder="Please write a short application about why you would like to apply for these positions..." onChange={e => changeText( e.target.value )} type="text" />
            </div>
            <div className="col col-lg-4">
              <PositionsBox />
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">

              <div className="card mb-2 w-100">
                <div className="ml-3 mt-3 mr-4">
                  <p>We understand that it might be hard to prioritize the positons you want to apply for. By checking the box below, we know that you don't have any specific preference between the positions you have entered. We can talk about which of the positions suits you best during the interview. </p>
                  <div className="row pl-3 mb-4">
                    <input type="checkbox" />
                    <h6 className="page-title ml-2 mb-0">The positions in my application are prioritized</h6>
                  </div>
                </div>
              </div>

              <div className="card w-100">
                <div className="ml-3 mt-3 mr-4">
                  <p>During the application process, we might discover that you are a good fit for a different position than those you have applied for. Would you be open to get an offer for a position different from the ones you have entered? </p>
                  <div className="row pl-3">
                    <input type="radio" />
                    <h6 className="page-title ml-2 mb-0">I am only interested in the positions I have entered</h6>
                  </div>
                  <div className="row pl-3">
                    <input type="radio" />
                    <h6 className="page-title ml-2 mb-0">I am open to other postions within the same genre of the positions I have entered</h6>
                  </div>
                  <div className="row pl-3 mb-4">
                    <input type="radio" />
                    <h6 className="page-title ml-2 mb-0">I am open to any other position in ISFiT, regardless of the positions I have entered</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mt-2">
                <button type="button" className="btn btn-outline-secondary float-left">Back</button>
                <a type="button" className="btn btn-outline-success float-right" href="/enteravailabletimes">Continue</a>
              </div>
          </div>
        
        </div>
      </PageLayout>
    );
};



export default ApplicationTextPage;