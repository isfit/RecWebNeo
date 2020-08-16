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
            <img src="./isfitlogo.png" className="header-brand-img mb-3" alt="Tabler React" style={{ maxWidth: "70px" }}></img>
            <h4>God in the IT team</h4>
            <span>Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang.Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang.Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang.Dette er en lang tekst med beskrivelsen til en stilling og denne skal være veldig lang. </span>
            <div className="flex-grid mt-4 mx-5">
                <div className="col-list ml-auto">
                        <h5>Team</h5>
                        <h4>Creative</h4>
                </div>
                <div className="col-list ml-auto mr-auto">
                    <h5>Section</h5>
                    <h4>Organizational resources</h4>
                </div>
            </div>
            <div className="flex-grid mt-4 mx-5">
                <button type="button" className="btn btn-outline-secondary mr-2 mb-2">Back</button>
                <button type="button" className="btn btn-outline-success ml-auto mr-2 mb-2">Add to application</button>
            </div>
        </Modal>
    );
};

export default LogInModal;
