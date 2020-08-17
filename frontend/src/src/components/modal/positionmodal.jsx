import React, { useState } from 'react';
import Modal from './modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../requests/userRequests';
import LoginModalForm from './loginModalForm';
import RegisterModalForm from './registerModalForm'
import "./loginModalStylesheet.css";


import { connect } from "react-redux";
import { closePositionModal } from "../../redux/actions";
import { getPositionModalState,getUserLogedIn } from "../../redux/selectors";

const PositionModal = ({position, showPositionModal, closePositionModal}) =>  {

    const [alreadyUser, setAlreadyUser] = useState(true);

    console.log("The position modal redux value is", showPositionModal);

    return(

        <Modal showModal={ showPositionModal }  setShowModal={ () => closePositionModal() }>
            <img src="./isfitlogo.png" className="header-brand-img mb-3" alt="Tabler React" style={{ maxWidth: "70px" }}></img>
            <h4>{position?.name}</h4>
            <span> {position?.description} </span>
            <div className="flex-grid mt-4 mx-5">
                <div className="col-list ml-auto">
                        <h5>Team</h5>
                        <h4>{position?.team.name}</h4>
                </div>
                <div className="col-list ml-auto mr-auto">
                    <h5>Section</h5>
                    <h4>{position?.section.name}</h4>
                </div>
            </div>
            <div className="flex-grid mt-4 mx-5">
                <button type="button" className="btn btn-outline-secondary mr-2 mb-2" onClick={ () => closePositionModal() }>Back</button>
                <button type="button" className="btn btn-outline-success ml-auto mr-2 mb-2">Add to application</button>
            </div>
        </Modal>
    );
};

const mapStateToProps = state => {
    return { 
        showPositionModal: getPositionModalState(state)
    };
};


export default connect(mapStateToProps, { closePositionModal })(PositionModal);
