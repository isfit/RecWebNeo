import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PositionChoiceBox from '../components/positionChoiceBox';
import PageLayout from './pageLayout';
import PrioritizedCard from '../components/application/prioritizedCard';
import InterestApplicationCard from '../components/application/interestApplicationCard';

const ApplicationTextPage = (props) => {
    const history = useHistory();

    const [text, changeText] = useState(localStorage.getItem("applicationText") || '');
    const [prioritized, setPrioritized] = useState(localStorage.getItem("prioritized") || true);
    const [otherPositions, setOtherPositions] = useState(localStorage.getItem("otherPositions") || "OnlyPositions");

    
    useEffect(() => {      //When entering page, go to the top of the page. Needed for iphone.
      window.scrollTo(0, 0)
    }, [])

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
          <h5 style={{ color: 'red'}}>APPLICATIONS FOR STUDENTS STUDIYING OUTSIDE OF TRONDHEIM HAVE NOT OPENED YET</h5>
          <small>Please write a short application about why you would like to apply for these positions. Please also specify if you prefer a digital or physical interview. </small>
          <div className="-adaptive">
            <div className="position-box-left mb-2">
              <textarea className="w-100 h-100" placeholder="Write here..." value={text} onChange={e => changeText( e.target.value )} type="text" style={{minHeight:"200px"}} />
            </div>
            <div className="shopping-box-right w-100 h-100">
              <PositionChoiceBox />
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
              <PrioritizedCard prioritizedValue={prioritized} setPrioritized={(pri) => setPrioritized(pri)} />
              <InterestApplicationCard interest={otherPositions} setInterest={otherPos => setOtherPositions(otherPos)} />
            </div>
          </div>
          <div className="row">
            <div className="col mt-2">
                <button className="btn btn-back float-left" onClick={() => goBach()}>Back</button>
                <button className="btn btn-continue float-right" onClick={() => continueWithApplication()}>Continue</button>
              </div>
          </div>
        
        </div>
      </PageLayout>
    );
};



export default ApplicationTextPage;