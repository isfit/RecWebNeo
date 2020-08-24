import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import PositionChoiceBox from '../components/positionChoiceBox';
import PageLayout from './pageLayout';

const ApplicationTextPage = (props) => {
    const history = useHistory();

    const [text, changeText] = useState(localStorage.getItem("applicationText") || '');
    const [prioritized, setPrioritized] = useState(localStorage.getItem("prioritized") || true);
    const [otherPositions, setOtherPositions] = useState(localStorage.getItem("otherPositions") || "OnlyPositions");



    const storeData = () => {
      localStorage.setItem("applicationText", text);
      localStorage.setItem("prioritized", prioritized);
      localStorage.setItem("otherPositions", otherPositions);
    }

    function goBach() {
      storeData();
      history.push("/");
    }

    const continueWithApplication = () => {
      storeData();
      history.push("/enteravailabletimes")
    };

    return (
      <PageLayout userLogedIn={ props.userLogedIn }  setUserLogedIn={ userLoginValue => props.setUserLogedIn(userLoginValue) }>
        <div className="container">
          <div className="page-header pt-3 mb-4">
            <h4 className="page-title">Enter application details</h4>
          </div>
          <div className="-adaptive">
            <div className="position-box-left">
              <textarea className="w-100 h-100" placeholder="Please write a short application about why you would like to apply for these positions..." value={text} onChange={e => changeText( e.target.value )} type="text" />
            </div>
            <div className="shopping-box-right w-100 h-100">
              <PositionChoiceBox />
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">

              <div className="card mb-2 px-3 py-2 w-100">
                <div className="">
                  <p>We understand that it might be hard to prioritize the positons you want to apply for. By unchecking the box below, we know that you don't have any specific preference between the positions you have entered. We can talk about which of the positions suits you best during the interview. </p>
                  <div className="flex-grid mb-3">
                    <input type="checkbox" checked={prioritized} onChange={() => setPrioritized(!prioritized)} />
                    <h6 className="page-title pl-2 mb-0">The positions in my application are prioritized</h6>
                  </div>
                </div>
              </div>

              <div className="card px-3 py-3 mb-2 w-100">
                <p>During the application process, we might discover that you are a good fit for a different position than those you have applied for. Would you be open to get an offer for a position different from the ones you have entered? </p>
                <div className="flex-grid">
                  <input type="radio" checked={otherPositions === "OnlyPositions"} onChange={() => setOtherPositions("OnlyPositions")} />
                  <h6 className="page-title ml-2 mb-0">I am only interested in the positions I have entered</h6>
                </div>
                <div className="flex-grid mt-3">
                  <input type="radio" checked={otherPositions === "Same"} onChange={() => setOtherPositions("Same")} />
                  <h6 className="page-title ml-2 mb-0">I am open to other postions within the same genre of the positions I have entered</h6>
                </div>
                <div className="flex-grid mt-3">
                  <input type="radio" checked={otherPositions === "open"} onChange={() => setOtherPositions("open")} />
                  <h6 className="page-title ml-2 mb-0">I am open to any other position in ISFiT, regardless of the positions I have entered</h6>
                </div> 
              
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col mt-2">
                <button className="btn btn-outline-secondary float-left" onClick={() => goBach()}>Back</button>
                <button className="btn btn-continue float-right" onClick={() => continueWithApplication()}>Continue</button>
              </div>
          </div>
        
        </div>
      </PageLayout>
    );
};



export default ApplicationTextPage;