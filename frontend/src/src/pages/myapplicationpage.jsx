import React, { useState, Component } from 'react';
import PositionChoiceBoxReadOnly from '../components/positionChoiceBoxReadOnly';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';
import AvailableTimesFormSimple from '../components/availableTimesFormSimple';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useQuery, gql } from "@apollo/client";
import { MYAPPLICATION } from "../requests/userRequests";

const MyApplicationPage = (props) => {

  const [text, changeText] = useState(localStorage.getItem("applicationText") || '');
  const [prioritized, setPrioritized] = useState(localStorage.getItem("prioritized") || true);
  const [otherPositions, setOtherPositions] = useState(localStorage.getItem("otherPositions") || "OnlyPositions");

  const { refetch, loading, error, data } = useQuery(MYAPPLICATION);
  const PositionsArePrioritized = data?.myApplication?.prioritized;
  const InterestedInOtherPositionsString = data?.myApplication?.interest ;
  const startInterview = new Date("2020-08-27T00:00:00.000Z");
  const endInterview = new Date("2020-09-10T00:00:00.000Z");

  

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
        <PageLayout>
          <div>
            You dont have an application registered.
          </div>
        </PageLayout>
      )
    }

    return (
      <PageLayout userLogedIn={ props.userLogedIn }  setUserLogedIn={ userLoginValue => props.setUserLogedIn(userLoginValue) }>
        <div className="container">
          <div className="page-header pt-3 mb-4">
            <h4 className="page-title">My application</h4>
          </div>
          <div className="row">
            <div className="col mt-3">
              
            <div className="container">
          <div className="row">
            <div className="col">
            <textarea className="w-100 h-100" readOnly={true} placeholder="You application text seems empty." type="text" value={data?.myApplication.applicationText}></textarea>
            </div>
            <div className="col col-lg-4">
              <PositionChoiceBoxReadOnly positions={data?.myApplication.positions.map( pos => pos.value)} title="My Positions"/>
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">

              <div className="card mb-2 w-100">
                <div className="ml-3 mt-3 mr-4">
                  <div className="row pl-3 mb-4">
                    <input type="checkbox" checked={PositionsArePrioritized} readOnly={true}/>
                    <h6 className="page-title ml-2 mb-0">The positions in my application are prioritized</h6>
                  </div>
                  { PositionsArePrioritized ? <p>You have entered that the prioritization of the positions in your application matter.</p> : <p>You have entered that the prioritization of your positions are not that important.</p> }
                </div>
              </div>

              <div className="card w-100 mb-3">
                <div className="ml-3 mt-3 mr-4">
                  <div className="row pl-3">
                    <input type="radio" checked={InterestedInOtherPositionsString === "OnlyPositions"} readOnly={true} />
                    <h6 className="page-title ml-2 mb-0">I am only interested in the positions I have entered</h6>
                  </div>
                  <div className="row pl-3">
                    <input type="radio" checked={InterestedInOtherPositionsString === "Same"} readOnly={true} />
                    <h6 className="page-title ml-2 mb-0">I am open to other postions within the same genre of the positions I have entered</h6>
                  </div>
                  <div className="row pl-3 mb-4">
                    <input type="radio" checked={(InterestedInOtherPositionsString === "open" || InterestedInOtherPositionsString === "Open")} readOnly={true} />
                    <h6 className="page-title ml-2 mb-0">I am open to any other position in ISFiT, regardless of the positions I have entered</h6>
                  </div>
                  {InterestedInOtherPositionsString === "OnlyPositions" ? <p>You have entered that you are only interested in the positions you have entered above.</p> : null} 
                  {InterestedInOtherPositionsString === "Same" ? <p>You have entered that you are also interested in positions within the same genre as those you have entered above.</p> : null} 
                  {(InterestedInOtherPositionsString === "open" || InterestedInOtherPositionsString === "Open") ? <p>This means you have entered that you are open to other positions in ISFiT.</p> : null} 
                </div>
              </div>
              <h5>Your Schedule</h5>
              { console.log("Dideli da",data?.myApplication?.available) }
              <AvailableTimesFormSimple 
                busyTimes={data?.myApplication?.available ?? []}
                setBusyTimes={busy => {
                  console.log("Hello there");
                }}
                startDate = {startInterview}
                endDate = {endInterview}
                hourDiff={2}
                firstTimeSlot={8}
                lastTimeSlot={20}
                readOnly = { true }
                selectable = { true }
              />
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