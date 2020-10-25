import React from "react";
import "./App.css";
import "./stylesheets/pages/flexgrid.css";

import LogInModal from "./components/modal/loginmodal";

import LandingPage from "./pages/landingpage";
import ApplicationTextPage from "./pages/applicationtextpage";
import AvailableTimesPage from "./pages/availabletimespage";
import MyProfilePage from "./pages/myprofilepage";
import MyApplicationPage from "./pages/myapplicationpage";
import ApplicationPage from "./pages/showapplicationspage";
import UserAdminPage from "./pages/useradminpage";
import InterviewsPage from "./pages/manageinterviewspage";
import MyInterviewsPage from "./pages/myinterviewspage";
import AllInterviewsPage from "./pages/allinterviewspage";
import Unavailabletimes from "./pages/internalavailabletimespage";
import UsersWithoutApplication from "./pages/userswithoutapplicationpage";
import Pling from "./pages/plingpage";





import { ApolloProvider, ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

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
  faFileAlt,
  faUsers,
  faCalendarTimes,
  faUsersCog,
  faTasks,
  faUserTie,
  faCheckCircle,
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
  faFileAlt,
  faUsers,
  faCalendarTimes,
  faUsersCog,
  faTasks,
  faUserTie,
  faCheckCircle,
);

const httpLink = new HttpLink({ uri: 'https://recruitment.isfit.org:5000/'}); //For queries+mutations


const wsLink = new WebSocketLink({               //For subscriptions (plingpage)
  uri: `ws://recruitment.isfit.org:5001/`,
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

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

const client = new ApolloClient({   //Cache-policy is for specific situation when removing preferred interviewers in useradminpage
  cache: new InMemoryCache({
    typePolicies: {
      Position: {
        fields: {
          prefferedInterviewers: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
    },
  }),
  link: authLink.concat(splitLink),
});

const App = () => {
  //localStorage.setItem("applicationPositions", "");
  let data = JSON.parse(localStorage.getItem('applicationPositions') || "[]");


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
            <Route path="/applications">
              {" "}
              <ApplicationPage />{" "}
            </Route>
            <Route path="/myprofile">
              {" "}
              <MyProfilePage />{" "}
            </Route>
            <Route path="/myapplication">
              {" "}
              <MyApplicationPage />{" "}
            </Route>
            <Route path="/useradminpage">
              {" "}
              <UserAdminPage />{" "}
            </Route>
            <Route path="/allinterviews">
              {" "}
              <AllInterviewsPage />{" "}
            </Route>
            <Route path="/myinterviews">
              {" "}
              <MyInterviewsPage />{" "}
            </Route>
            <Route path="/manageinterviews">
              {" "}
              <InterviewsPage />{" "}
            </Route>
            <Route path="/unavailabletimes">
              {" "}
              <Unavailabletimes />{" "}
            </Route>
            <Route path="/userswithoutapplication">
              {" "}
              <UsersWithoutApplication />{" "}
            </Route>
            <Route path="/pling">
              {" "}
              <Pling />{" "}
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