import React, { useState } from 'react';
import Modal from './modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../requests/userRequests';
import LoginModalForm from './loginModalForm';
import RegisterModalForm from './registerModalForm'
import "./loginModalStylesheet.css";

import { connect } from "react-redux";
import { closeLoginModal } from "../../redux/actions";
import { getLoginModalState,getUserLogedIn } from "../../redux/selectors";

const LogInModal = ({showLoginModal, closeLoginModal}) =>  {

    const [alreadyUser, setAlreadyUser] = useState(true);

    console.log("Hello there");
    console.log("The redux value is", showLoginModal);

    return(
        <Modal showModal={showLoginModal} setShowModal={ () => closeLoginModal() } >
            <div className="loginChoiceWrapper">
                <div className="loginChoice" onClick={() => setAlreadyUser(true)} > Login </div>
                <div className="loginChoice" onClick={() => setAlreadyUser(false)} > Register </div>
            </div>
            {
                showLoginModal ? <LoginModalForm setShowModal={() => closeLoginModal()} /> : <RegisterModalForm />
            }
        </Modal>
    );
};

const mapStateToProps = state => {
    return { 
        showLoginModal: getLoginModalState(state)
    };
};

export default connect(mapStateToProps, { closeLoginModal })(LogInModal);