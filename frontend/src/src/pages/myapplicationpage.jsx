import React, { useState, useEffect } from 'react';
import PositionChoiceBoxReadOnly from '../components/positionChoiceBoxReadOnly';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';
import AvailableTimesFormSimple from '../components/availableTimesFormSimple';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useMutation } from "@apollo/client";
import { MYAPPLICATION } from "../requests/userRequests";
import PrioritizedCard from '../components/application/prioritizedCard';
import InterestApplicationCard from '../components/application/interestApplicationCard';
import { UPDATE_APPLICATION } from "../requests/applicationRequests";
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

const MyApplicationPage = (props) => {

  const { refetch, loading, error, data } = useQuery(MYAPPLICATION, {fetchPolicy: "no-cache"});
  const [updateApplicationMutation, { updatedData, updateError, updateLoading }] = useMutation(UPDATE_APPLICATION, {
    onError: () => {},
    onCompleted: () => {alert("Your application is now updated!")}
  });

  const [applicationText, changeText] = useState('');
  const [prioritized, setPrioritized] = useState(true);
  const [otherPositions, setOtherPositions] = useState("OnlyPositions");
  const [enteredBusyTimes, setEnteredBusyTimes] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const startInterview = new Date("2020-08-27T00:00:00.000Z");
  const endInterview = new Date("2020-09-10T00:00:00.000Z");

  useEffect( () => {
    changeText(data?.myApplication?.applicationText);
    setPrioritized(data?.myApplication?.prioritized);
    setOtherPositions(data?.myApplication?.interest);
    setEnteredBusyTimes(data?.myApplication?.available);
  }, [data]);

  const updateApplication = () => {
    const variableData = {
      variables: {
        input: {
          applicationText: applicationText,
          prioritized: prioritized,
          interest: otherPositions,
          available: enteredBusyTimes,
          //positions: data?.myApplication.positions.map( pos => pos.value),
        }
      }
    };
    updateApplicationMutation(variableData);
    setEditMode(false);
  };

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
          <div className="flex-grid pt-2 px-2" style={{justifyContent: "space-between"}}>
            <h4 className="page-title">My application</h4>
            { editMode ? <div><small className="mr-2">You can now edit the fields below.</small><button type="button" className="btn btn-secondary mr-2" onClick={() => setEditMode(false)}>Cancel editing</button><button type="button" className="btn btn-success" onClick={() => updateApplication()}>Update Application</button></div> : <button type="button" className="btn btn-secondary" onClick={() => setEditMode(true)}>Edit</button> }
          </div>
          <div className="row">
            <div className="col mt-3">
              
            <div className="container">
          <div className="row">
            <div className="col">
             <textarea 
                className="w-100 h-100"
                readOnly = {!editMode}
                placeholder="You application text seems empty." 
                type="text" 
                value={applicationText}
                onChange={e => changeText( e.target.value )} >
              </textarea>
            </div>
            <div className="col col-lg-4">
              <PositionChoiceBoxReadOnly positions={data?.myApplication.positions.map( pos => pos.value)} title="My Positions"/>
            </div>
          </div>
          <div className="row">
            <div className="col mt-3">
              <PrioritizedCard readOnly={!editMode} prioritizedValue={prioritized} setPrioritized={(pri) => setPrioritized(pri)} />
              <InterestApplicationCard readOnly={!editMode} interest={otherPositions} setInterest={otherPos => setOtherPositions(otherPos)} />
              <h5>Your Schedule</h5>
              <AvailableTimesFormSimple 
                busyTimes={data?.myApplication?.available ?? []}
                setBusyTimes={busy => {
                  setEnteredBusyTimes(busy);
                }}
                startDate = {startInterview}
                endDate = {endInterview}
                hourDiff={2}
                firstTimeSlot={8}
                lastTimeSlot={20}
                readOnly = { !editMode }
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