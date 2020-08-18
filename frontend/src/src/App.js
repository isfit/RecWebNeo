import React, { useState } from "react";
import "./App.css";

import LogInModal from "./components/modal/loginmodal";

import LandingPage from "./pages/landingpage";
import ApplicationTextPage from "./pages/applicationtextpage";
import AvailableTimesPage from "./pages/availabletimespage";
import MyProfilePage from "./pages/myprofilepage";
import MyApplicationPage from "./pages/myapplicationpage";

import { ApolloProvider, ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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
  faArrowUp,
  faArrowDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheckSquare,
  faCoffee,
  faAddressCard,
  faListOl,
  faSignature,
  faPhoneAlt,
  faArrowUp,
  faArrowDown,
  faTrashAlt,
);

const httpLink = new HttpLink({ uri: 'https://localhost:44391/'});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('AuthorizationKey');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMzgwMmUxY2JjZDg4ODkwM2VlMDUwMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzYW5kZXIuay5raWxlbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsic3VwZXJ1c2VyIiwiYWRtaW4iXSwiZXhwIjoxNTk3ODM2NTA5LCJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSJ9.s7uoIj_Dgt9UbnP953PacDKaqPakw3dPTsRmj_I-xlM"
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const App = () => {
  //localStorage.setItem("applicationPositions", "");
  let data = JSON.parse(localStorage.getItem('applicationPositions') || "[]");
  console.log("App.js data:", data);

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