import React, { useState } from 'react';
import Modal from './modal';

import { connect } from "react-redux";
import { closePositionModal, addPositionToApplication } from "../../redux/actions";
import { getPositionModalState,getUserLogedIn } from "../../redux/selectors";

const PositionModal = ({position, showPositionModal, closePositionModal, addPositionToApplication}) =>  {

    const [alreadyUser, setAlreadyUser] = useState(true);

    const addAndClose = (position) => {
        addPositionToApplication(position?.id, position?.name)
        closePositionModal()
    };

    return(

        <Modal showModal={ showPositionModal }  setShowModal={ () => closePositionModal() }>
            <img src="./isfitlogo.png" className="header-brand-img mb-3" alt="Tabler React" style={{ maxWidth: "70px" }}></img>
            <h4>{position?.name}</h4>
            <div className="mb-2">
                <p className="text-muted mb-0 mt-2">Contact: {position?.contact?.name}</p>
                <p className="text-muted mb-0"> {position?.contact?.email} / {position?.contact?.phoneNumer}</p>
            </div>
            <span> {position?.description} </span>
            <div className="flex-grid mt-4 mx-5" style={{justifyContent:"space-evenly"}}>
                <div>
                        <h5>Section</h5>
                        <h4>{position?.section.name}</h4>
                </div>
                <div>
                    <h5>Team</h5>
                    <h4>{position?.team.name}</h4>
                </div>
            </div>
            <div className="flex-grid mt-4 mx-5">
                <button type="button" className="btn btn-outline-secondary mr-2 mb-2" onClick={ () => closePositionModal() }>Back</button>
                <button type="button" className="btn btn-continue ml-auto mr-2 mb-2" onClick={() => addAndClose(position) }>Add to application</button>
            </div>
        </Modal>
    );
};

const mapStateToProps = state => {
    return { 
        showPositionModal: getPositionModalState(state)
    };
};


export default connect(mapStateToProps, { addPositionToApplication, closePositionModal })(PositionModal);
