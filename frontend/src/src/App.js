import React, { useState } from 'react';
import './App.css';

import LogInModal from './components/modal/loginmodal';

import LandingPage from './pages/landingpage';
import ApplicationTextPage from './pages/applicationtextpage';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faAddressCard, faListOl, faSignature, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faAddressCard, faListOl, faSignature, faPhoneAlt)

const App = () => {
  const [showingLogInModal, showLogInModal] = useState(true);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/enterapplication"> <ApplicationTextPage showingLogInModal={ showingLogInModal }  showLogInModal={ showLogInModal } /> </Route>
          <Route path="/"> <LandingPage showingLogInModal={ showingLogInModal }  showLogInModal={ showLogInModal } /> </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};



export default App;
