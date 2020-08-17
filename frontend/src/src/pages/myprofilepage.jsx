import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import Positions from '../components/positions';
import SearchModule from '../components/searchmodule';
import ShoppingCart from '../components/shoppingcart';
import PageLayout from './pageLayout';

import LogInModal from '../components/modal/loginmodal';
import ErrorPage from './errorPage';

import "../stylesheets/pages/flexgrid.css";

import { useQuery, gql } from "@apollo/client";
import { ME } from "../requests/userRequests";

const MyProfilePage = (props) => {

    const { refetch, loading, error, data } = useQuery(ME);
    console.log("My profile");
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
            errorMessage={"The current user is not authorized to access this resource."}
            errorType={"AuthenticationError"}
            refetch={() => refetch()}
          />
        </PageLayout>
      )
    }

    return (
        <PageLayout>
          <div className="container w-50">
            <div className="flex-grid py-5">
              <div className="col">
                  <img className="w-100" src='/profilepic.png' alt="Logo" />
              </div>
              <div className="col">
                  <div className="card h-100 py-3 px-3">
                      <span>Name</span>
                      <h5> { data.me.firstName } { data.me.lastName } </h5>
                      <span>E-mail</span>
                      <h5>{ data.me.email }</h5>
                      <span>Birth date</span>
                      <h5>{ data.me.birtDate }</h5>
                      <button className="mt-5">Edit information</button>
                  </div>
              </div>
            </div>
          </div>
          </PageLayout>
    );

};


export default MyProfilePage;