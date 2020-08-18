import React, { useState, Component } from 'react';
import PositionChoiceBox from '../components/positionChoiceBox';
import PageLayout from './pageLayout';
import ErrorPage from './errorPage';


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useQuery, gql } from "@apollo/client";
import { MYAPPLICATION } from "../requests/userRequests";

const MyApplicationPage = (props) => {
    const [text, changeText] = useState('');
    { console.log(text) }

    const { refetch, loading, error, data } = useQuery(MYAPPLICATION);
    console.log("My application");
    console.log(loading, error, data);

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
              { console.log("Data", data) }
                <div className="card">
                        <div>
                            <div> { data?.myApplication?.applicationText || "You have not registered an application yet" } </div>
                        </div>
                    {/* {if (data.myApplication.interest === "")   } */}
                </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
};


export default MyApplicationPage;