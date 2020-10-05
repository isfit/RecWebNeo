import React, { useState, useEffect } from "react";
import PositionChoiceBoxSimple from "../components/positionChoiceBoxSimple";
import PageLayout from "./pageLayout";
import ErrorPage from "./errorPage";
import AvailableTimesFormSimple from "../components/availableTimesFormSimple";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useMutation } from "@apollo/client";
import { MYAPPLICATION } from "../requests/userRequests";
import PrioritizedCard from "../components/application/prioritizedCard";
import InterestApplicationCard from "../components/application/interestApplicationCard";
import { UPDATE_APPLICATION } from "../requests/applicationRequests";
import { GET_ADMISSION_PERIODS } from "../requests/orgRequests";

const MyApplicationPage = (props) => {
  //QUERIES
  const { refetch, loading, error, data } = useQuery(MYAPPLICATION, {
    fetchPolicy: "no-cache",
  });
  const admissionPeriodData = useQuery(GET_ADMISSION_PERIODS);
  let admissionPeriod = admissionPeriodData?.data?.admisionPeriodes[0] ?? [];


  //MUTATIONS
  const [
    updateApplicationMutation,
    { updatedData, updateError, updateLoading },
  ] = useMutation(UPDATE_APPLICATION, {
    onError: () => {
      alert("Something went wrong when trying to update your application");
    },
    onCompleted: () => {
      alert("Your application is now updated!");
    },
  });

  //HOOKS
  const [applicationText, changeText] = useState("");
  const [prioritized, setPrioritized] = useState(true);
  const [otherPositions, setOtherPositions] = useState("OnlyPositions");
  const [enteredBusyTimes, setEnteredBusyTimes] = useState([]);
  const [enteredPositions, setEnteredPositions] = useState([]);
  console.log(data?.myApplication?.available);

  const [editMode, setEditMode] = useState(false);

  const startInterview = new Date(admissionPeriod.startInterviewDate);
  const endInterview = new Date(admissionPeriod.endInterviewDate);

  useEffect(() => {
    changeText(data?.myApplication?.applicationText);
    setPrioritized(data?.myApplication?.prioritized);
    setOtherPositions(data?.myApplication?.interest);
    setEnteredBusyTimes(data?.myApplication?.available);
    setEnteredPositions(data?.myApplication?.positions);
  }, [data]);

  //FUNCTIONS
  const updateApplication = () => {
    let positionKeyAndValue = enteredPositions.map((position) => {
      return { key: position.key.toString(), value: position.value.id };
    });
    //let datetimeToStringArray = enteredBusyTimes.map((date) => {if(typeof date === "object"){return date}else{return new Date(date)}})
    let datetimeToStringArray = enteredBusyTimes.map((date) => {if(typeof date === "object"){return date}else{return new Date(date)}})
    console.log("LIST:", datetimeToStringArray)
    const variableData = {
      variables: {
        input: {
          applicationText: applicationText,
          prioritized: prioritized,
          interest: otherPositions,
          available: datetimeToStringArray,
          positions: positionKeyAndValue,
        },
      },
    };
    console.log(variableData)
    //updateApplicationMutation(variableData);
    setEditMode(false);
  };

  const MovePositionUp = (id) => {
    let positionDataCopy = [...enteredPositions];
    const index = positionDataCopy.findIndex((x) => x.value.id === id);
    if (index > 0) {
      const newPositionsPri = positionDataCopy;
      const position = newPositionsPri.splice(index, 1)[0];
      newPositionsPri.splice(index - 1, 0, position);
    }
    positionDataCopy.map((position, index) => (position.key = index));
    setEnteredPositions(positionDataCopy);
  };

  const MovePositionDown = (id) => {
    let positionDataCopy = [...enteredPositions];
    const index = positionDataCopy.findIndex((x) => x.value.id === id);
    if (index < positionDataCopy.length - 1) {
      const newPositionsPri = positionDataCopy;
      const position = newPositionsPri.splice(index, 1)[0];
      newPositionsPri.splice(index + 1, 0, position);
    }
    positionDataCopy.map((position, index) => (position.key = index));
    setEnteredPositions(positionDataCopy);
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error != null) {
    return (
      <PageLayout>
        <ErrorPage
          errorMessage={
            "Could not fetch your application. Make sure you are logged in and have entered an application."
          }
          errorType={"AuthenticationError"}
          refetch={() => refetch()}
        />
      </PageLayout>
    );
  }

  if (data.myApplication == null) {
    return (
      <PageLayout>
        <div>You dont have an application registered.</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      userLogedIn={props.userLogedIn}
      setUserLogedIn={(userLoginValue) => props.setUserLogedIn(userLoginValue)}
    >
      <div className="container">
        <div
          className="flex-grid pt-2 px-2"
          style={{ justifyContent: "space-between" }}
        >
          <h4 className="page-title">My application</h4>
          {editMode ? (
            <div>
              <small className="mr-2">You can now edit the fields below.</small>
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={() => setEditMode(false)}
              >
                Cancel editing
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => updateApplication()}
              >
                Update Application
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
        </div>
        <div className="row">
          <div className="col mt-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <textarea
                    className="w-100 h-100"
                    readOnly={!editMode}
                    placeholder="You application text seems empty."
                    type="text"
                    value={applicationText}
                    onChange={(e) => changeText(e.target.value)}
                  ></textarea>
                </div>
                <div className="col col-lg-4">
                  <PositionChoiceBoxSimple
                    positions={enteredPositions?.map((pos) => pos.value)}
                    title="My Positions"
                    readOnly={!editMode}
                    MovePositionUp={(id) => MovePositionUp(id)}
                    MovePositionDown={(id) => MovePositionDown(id)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <PrioritizedCard
                    readOnly={!editMode}
                    prioritizedValue={prioritized}
                    setPrioritized={(pri) => setPrioritized(pri)}
                  />
                  <InterestApplicationCard
                    readOnly={!editMode}
                    interest={otherPositions}
                    setInterest={(otherPos) => setOtherPositions(otherPos)}
                  />
                  <h5>Your Schedule</h5>
                  <AvailableTimesFormSimple
                    busyTimes={data?.myApplication?.available ?? []}
                    setBusyTimes={(busy) => {
                      setEnteredBusyTimes(busy);
                    }}
                    startDate={startInterview}
                    endDate={endInterview}
                    hourDiff={1}
                    firstTimeSlot={8}
                    lastTimeSlot={22}
                    readOnly={!editMode}
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
