import React, { useState } from 'react';
import Modal from './modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogInModal = (props) =>  {
    const [showingRegisterModal, showRegisterModal] = useState(false);


    return(
        <Modal showingLogInModal={ props.showingLogInModal }  showLogInModal={ props.showLogInModal }>
            <div className="row">
                <div className="col pr-0 pl-0 col-lg-2">
                    <div className="row mt-3">
                        <FontAwesomeIcon className="ml-auto mr-2 mt-5" icon="signature" />
                    </div>
                    <div className="row mt-2">
                        <FontAwesomeIcon className="ml-auto mr-3 mt-1" icon="signature" />
                    </div>
                </div>
                <div className="col col-lg-90">
                    <div className="row d-flex justify-content-center mt-3">
                        <h2>Register</h2>
                    </div>
                    <div className="row mt-4">
                        <span className="ml-1">Name</span>
                        <input className="navbar-search" placeholder="First name..."></input>
                        <input className="navbar-search mt-1" placeholder="Last name..."></input>
                    </div>
                    <div className="row mt-4">
                        <span className="">Phone number</span>
                        <input className="navbar-search" placeholder="18002738"></input>
                    </div>
                    <div className="row mt-4">
                        <span className="ml-1">E-mail address</span>
                        <input className="navbar-search" placeholder="dalai@lama.no"></input>
                    </div>
                    <div className="row mt-4">
                        <span className="ml-1">Password</span>
                        <input className="navbar-search" type="password" placeholder="Choose a password..."></input>
                        <input className="navbar-search mt-1" type="password" placeholder="Retype password"></input>
                    </div>


                    <div className="row d-flex justify-content-center mt-5">
                            <button className="signinbutton mt-5">Register</button>
                    </div>

                </div>
                <div className="col pr-0 pl-0 col-lg-2">

                </div>
            </div>
        </Modal>
    );
};

export default LogInModal;
