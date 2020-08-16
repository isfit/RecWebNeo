import React, { useState } from 'react';
import Modal from './modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../requests/userRequests';
import LoginModalForm from './loginModalForm';
import RegisterModalForm from './registerModalForm'
import "./loginModalStylesheet.css";

import { connect } from "react-redux";
import { setLoginModal } from "../../redux/actions";
import { getLoginModalState } from "../../redux/selectors";

const LogInModal = ({showLoginModal, setLoginModal}) =>  {

    const [alreadyUser, setAlreadyUser] = useState(true);

    console.log("Hello there");
    console.log("The redux value is", showLoginModal);

    return(
        <Modal showModal={showLoginModal} setShowModal={ value => setLoginModal(value) } >
            <div className="loginChoiceWrapper">
                <div className="loginChoice" onClick={() => setAlreadyUser(true)} > Login </div>
                <div className="loginChoice" onClick={() => setAlreadyUser(false)} > Register </div>
            </div>
            {
                alreadyUser ? <LoginModalForm setShowModal={value => setLoginModal(value)} /> : <RegisterModalForm />
            }
        </Modal>
    );
};

const mapStateToProps = state => {
    console.log(state);
    return { showLoginModal: getLoginModalState(state) };
};

export default connect(mapStateToProps, { setLoginModal })(LogInModal);