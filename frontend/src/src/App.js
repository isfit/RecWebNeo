import React, { useState } from "react";
import "./App.css";

import LogInModal from "./components/modal/loginmodal";

import LandingPage from "./pages/landingpage";
import ApplicationTextPage from "./pages/applicationtextpage";
import AvailableTimesPage from "./pages/availabletimespage";
import MyProfilePage from "./pages/myprofilepage";
import MyApplicationPage from "./pages/myapplicationpage";

import { ApolloProvider, ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { getUserAuthKey } from "./redux/selectors";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faAddressCard,
  faListOl,
  faSignature,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheckSquare,
  faCoffee,
  faAddressCard,
  faListOl,
  faSignature,
  faPhoneAlt
);

const httpLink = new HttpLink({ uri: 'http://recruitment.isfit.org:5000/'});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization: "Bearer " + localStorage.getItem('AuthorizationKey') || null,
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const App = () => {

  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/enterapplication">
              {" "}
              <ApplicationTextPage/>{" "}
            </Route>
            <Route path="/enteravailabletimes">
              {" "}
              <AvailableTimesPage />{" "}
            </Route>
            <Route path="/myprofile">
              {" "}
              <MyProfilePage />{" "}
            </Route>
            <Route path="/myapplication">
              {" "}
              <MyApplicationPage />{" "}
            </Route>
            <Route path="/">
              {" "}
              <LandingPage/>{" "}
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    </ApolloProvider>
  );
};

export default App;