import React, { useState } from 'react';
import Modal from './modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogInModal = (props) =>  {
    const [showingRegisterModal, showRegisterModal] = useState(false);


    return(
        <Modal showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal }>
            <div className="col">
                <div className="row d-flex justify-content-center mt-5">
                    <h2 className="" >Sign in</h2>
                </div>
                <div className="row d-flex justify-content-center mt-5">
                    <div className="container w-75">
                        <span className="ml-1">Username</span>
                        <input className="navbar-search" placeholder="Type your username..."></input>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-4">
                    <div className="container w-75">
                        <span className="ml-1">Password</span>
                        <input className="navbar-search" type="password" placeholder="Type your password..."></input>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-5">
                        <button className="signinbutton mt-5">Sign in</button>
                </div>
            </div>
        </Modal>
    );
};

export default LogInModal;
