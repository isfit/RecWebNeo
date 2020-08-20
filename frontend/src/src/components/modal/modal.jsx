import React from 'react';
import "../../stylesheets/components/modal/modal.css";

const Modal = (props) =>  {

    if(!props.showModal){
        return null;
    }
    return (
        <div>
            <div className="modal-overlay"/>
                <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                    <div className="modalbox">
                        <div className="modal-top">
                            <button type="button" className="modal-close-button ml-auto" data-dismiss="modal" aria-label="Close" onClick={() => props.setShowModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    {props.children}   
                </div>
            </div>
        </div>
    );          
};


export default Modal;