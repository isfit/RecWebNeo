import React, { useState, Component } from 'react';
import PositionChoicBox from '../components/positionChoiceBox';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';
import AvailableTimesFom from '../components/availableTimesForm';


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useQuery, gql } from "@apollo/client";
import { MYAPPLICATION } from "../requests/userRequests";

const MyApplicationPage = (props) => {

  const [text, changeText] = useState(localStorage.getItem("applicationText") || '');
  const [prioritized, setPrioritized] = useState(localStorage.getItem("prioritized") || true);
  const [otherPositions, setOtherPositions] = useState(localStorage.getItem("otherPositions") || "OnlyPositions");

    const { refetch, loading, error, data } = useQuery(MYAPPLICATION);

    if (loading) {  
        return (
          <div>Loading</div>
        )
    }

    if (error != null) {
        return (
          <PageLayout>
            <ErrorPage 
              errorMessage={"Could not fetch your application. Make sure you are logged in and have entered an application."}
              errorType={"AuthenticationError"}
              refetch={() => refetch()}
            />
          </PageLayout>
        )
    }

    if( data.myApplication == null ) {
      return(
        <div>
          You dont have an application registered.
        </div>
      )
    }

    return (
      <PageLayout userLogedIn={ props.userLogedIn }  setUserLogedIn={ userLoginValue => props.setUserLogedIn(userLoginValue) }>
        <div className="container">
          <div className="page-header pt-3 mb-4">
            <h4 className="page-title">My application</h4>
          </div>
          <div className="row">
            <div className="col">
             {/*  <textarea readOnly="true" className="w-100 h-100" placeholder="My application text" type="text"> {data.myApplication.applicationText} </textarea> */}
            </div>
            <div className="col col-lg-4">
               {/*  <PositionChoiceBox positions={data.myApplication.positions} /> */}
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
              
            <div className="container">
          <div className="page-header pt-3 mb-4">
            <h4 className="page-title">Enter application text</h4>
          </div>
          <div className="row">
            <div className="col">
              <textarea className="w-100 h-100" placeholder="Please write a short application about why you would like to apply for these positions..." value={text} onChange={e => changeText( e.target.value )} type="text" />
            </div>
            <div className="col col-lg-4">
              <PositionChoicBox />
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">

              <div className="card mb-2 w-100">
                <div className="ml-3 mt-3 mr-4">
                  <p>We understand that it might be hard to prioritize the positons you want to apply for. By checking the box below, we know that you don't have any specific preference between the positions you have entered. We can talk about which of the positions suits you best during the interview. </p>
                  <div className="row pl-3 mb-4">
                    <input type="checkbox" checked={prioritized} onChange={() => setPrioritized(!prioritized)} />
                    <h6 className="page-title ml-2 mb-0">The positions in my application are prioritized</h6>
                  </div>
                </div>
              </div>

              <div className="card w-100">
                <div className="ml-3 mt-3 mr-4">
                  <p>During the application process, we might discover that you are a good fit for a different position than those you have applied for. Would you be open to get an offer for a position different from the ones you have entered? </p>
                  <div className="row pl-3">
                    <input type="radio" checked={otherPositions == "OnlyPositions"} onChange={() => setOtherPositions("OnlyPositions")} />
                    <h6 className="page-title ml-2 mb-0">I am only interested in the positions I have entered</h6>
                  </div>
                  <div className="row pl-3">
                    <input type="radio" checked={otherPositions == "Same"} onChange={() => setOtherPositions("Same")} />
                    <h6 className="page-title ml-2 mb-0">I am open to other postions within the same genre of the positions I have entered</h6>
                  </div>
                  <div className="row pl-3 mb-4">
                    <input type="radio" checked={otherPositions == "open"} onChange={() => setOtherPositions("open")} />
                    <h6 className="page-title ml-2 mb-0">I am open to any other position in ISFiT, regardless of the positions I have entered</h6>
                  </div>
                </div>
              </div>

            </div>
          </div>
        
        </div>

            </div>
          </div>
        </div>
      </PageLayout>
    );
};


export default MyApplicationPage;