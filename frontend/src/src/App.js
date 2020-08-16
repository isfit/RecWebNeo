import React, { useState } from "react";
import "./App.css";

import LogInModal from "./components/modal/loginmodal";

import LandingPage from "./pages/landingpage";
import ApplicationTextPage from "./pages/applicationtextpage";
import AvailableTimesPage from "./pages/availabletimespage";
import MyProfilePage from "./pages/myprofilepage";
import MyApplicationPage from "./pages/myapplicationpage";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

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

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

const App = () => {
  let [userLogedIn, setUserLogedIn] = useState(false);
  console.log("From app, user loged in:", userLogedIn);

  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/enterapplication">
              {" "}
              <ApplicationTextPage
                userLogedIn={userLogedIn}
                setUserLogedIn={(userLoginValue) =>
                  setUserLogedIn(userLoginValue)
                }
              />{" "}
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
              <MyApplicationPage 
                userLogedIn={userLogedIn}
                setUserLogedIn={(userLoginValue) =>
                  setUserLogedIn(userLoginValue)
                }
              />{" "}
            </Route>
            <Route path="/">
              {" "}
              <LandingPage
                userLogedIn={userLogedIn}
                setUserLogedIn={(userLoginValue) =>
                  setUserLogedIn(userLoginValue)
                }
              />{" "}
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    </ApolloProvider>
  );
};

export default App;
