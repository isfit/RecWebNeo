import React, { useState } from 'react';
import Modal from './modal';
import LoginModalForm from './loginModalForm';
import RegisterModalForm from './registerModalForm'
import "../../stylesheets/components/modal/loginModalStylesheet.css";

import { connect } from "react-redux";
import { closeLoginModal } from "../../redux/actions";
import { getLoginModalState,getUserLogedIn } from "../../redux/selectors";

const LogInModal = ({showLoginModal, closeLoginModal}) =>  {

    const [alreadyUser, setAlreadyUser] = useState(true);

    return(
        <Modal showModal={showLoginModal} setShowModal={ () => closeLoginModal() } >
            <div className="loginChoiceWrapper">
                <div className="loginChoice" onClick={() => setAlreadyUser(true)} > Sign in </div>
                <div className="loginChoice" onClick={() => setAlreadyUser(false)} > Register </div>
            </div>
            {
                alreadyUser ? <LoginModalForm setShowModal={() => closeLoginModal()} /> : <RegisterModalForm setShowModal={() => closeLoginModal()} />
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