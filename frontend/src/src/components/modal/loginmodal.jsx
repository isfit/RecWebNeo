import React, { useState } from 'react';
import Modal from './modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../requests/userRequests';
import LoginModalForm from './loginModalForm';
import RegisterModalForm from './registerModalForm'
import "./loginModalStylesheet.css";

const LogInModal = (props) =>  {

    const [alreadyUser, setAlreadyUser] = useState(true);

    return(

        <Modal showModal={ props.showModal }  setShowModal={ showModalValue => props.setShowModal(showModalValue) }>
            <div className="loginChoiceWrapper">
                <div className="loginChoice" onClick={() => setAlreadyUser(true)} > Login </div>
                <div className="loginChoice" onClick={() => setAlreadyUser(false)} > Register </div>
            </div>
            {
                alreadyUser ? <LoginModalForm setShowModal={ showModalValue => props.setShowModal(showModalValue)} /> : <RegisterModalForm />
            }
        </Modal>
    );
};

export default LogInModal;
