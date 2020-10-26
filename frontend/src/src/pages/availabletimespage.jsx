import React, {useState, useEffect} from "react";
import PageLayout from './pageLayout';

import AvailableTimesFormSimple from '../components/availableTimesFormSimple';

import ErrorPage from './errorPage';

import { APPLY } from "../requests/userRequests";
import { GET_ADMISSION_PERIODS } from  "../requests/orgRequests";
import { useQuery, useMutation } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AvailableTimesPage = (props) => {

  const [updateRegistration, { data, error, loading }] = useMutation(APPLY, {
    onError: () => {},
  });


  const admissionPeriodData = useQuery(GET_ADMISSION_PERIODS);
  let admissionPeriod = admissionPeriodData?.data?.admisionPeriodes[0] ?? [];
  //Here I just use the first admission period. 
  //Not a very good solution, but as long we are only working with one admission period, it will work.
  
  const startInterview = new Date(admissionPeriod.startInterviewDate);
  const endInterview = new Date(admissionPeriod.endInterviewDate);

  const [enteredBusyTimes, setEnteredBusyTimes] = useState([]);

  const getPositions = () => {
    const positions = JSON.parse(localStorage.getItem('applicationPositions') || "[]");
    const positionInput = [];
    for (let i = 0; i < positions.length; i++) {
      const pos = {key: i.toString(), value: positions[i].id};
      positionInput.push(pos);
    }
    return positionInput;
  };

  useEffect(() => {      //When entering page, go to the top of the page. Needed for iphone.
    window.scrollTo(0, 0)
  }, [])

  const variableData = {
    variables: {
      input: {
        admissionPeriode: "5f81e32d6a81a500011ae8d7",
        applicationText: localStorage.getItem("applicationText") || "",
        available: enteredBusyTimes,
        interest: localStorage.getItem("otherPositions") || "OnlyPositions",
        positions: getPositions(),
        preferDigital: true,
        prioritized: localStorage.getItem("prioritized") === 'true',
      }
    }
  };

  const submitApplication = () => {
      console.log("These are the saved times:", enteredBusyTimes);
      console.log("VARIABLE DATA ",variableData );
      updateRegistration(variableData);
    };

  if (loading) {
    return (
      <div>Loading</div>
    )
  }


  if (data != null ){
    return (
      <PageLayout>
            <div className="container pt-5">
                <div className="flex-grid-adaptive py-5" style={{flexDirection:"column", justifyContent:"center",textAlign:"center"}}>
                    <div>
                        <span style={{fontSize: "2em", color: "#1bae91"}}>
                            <FontAwesomeIcon className="fas check-circle fa-10x" icon="check-circle" />
                        </span>
                    </div>
                    <div className="mb-5">
                        <h1 style={{color:"#1bae91"}}>Application entered successfully</h1>
                        <h1 style={{color:"#1bae91"}}>Thank you!</h1>
                        <small className="text-muted">You can view and edit your application under the My Application tab.</small>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
  };

  if (error?.message == "There already exists an application for this user for this application periode.") {
    return (
        <PageLayout>
          <span>There already exists an application for this user. Go to my application to see it.</span>
        </PageLayout>

    );
  };

  if (error?.message == "There must be at least 1 and at most 3 positions connected to an application") {
    return (
        <PageLayout>
          <span>There must be at least 1 and at most 3 positions connected to an application</span>
        </PageLayout>

    );
  };

  if (error != null) {
    console.log("ERROR: ", error)
    return (
      <PageLayout>
        <ErrorPage 
          errorMessage={"The current user is not authorized to access this resource."}
          errorType={"AuthenticationError"}
          refetch={() => updateRegistration(variableData)}
        />
      </PageLayout>
    )
  }



  return (
    <PageLayout>
      <div className="container">
        <div className="page-header pt-3 mb-4">
          <h4 className="page-title">Enter the hours you are busy</h4>
        </div>
        

        <AvailableTimesFormSimple 
          busyTimes={[]}
          setBusyTimes={ (busy) => setEnteredBusyTimes(busy) }
          startDate = {startInterview}
          endDate = {endInterview}
          hourDiff={1}
          firstTimeSlot={8}
          lastTimeSlot={22}
          readOnly = {false}
         />

        <div className="row">
          <div className="col mb-3">
            <a
              type="button"
              className="btn btn-outline-secondary float-left"
              href="/enterapplication"
            >
              Back
            </a>
            <a
              type="button"
              className="btn btn-continue float-right"
              onClick={() => submitApplication()}
            >
              Submit My Application
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AvailableTimesPage;
