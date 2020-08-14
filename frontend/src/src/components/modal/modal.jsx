import React from 'react';
import "./modal.css";

const Modal = (props) =>  {
    if(!props.showingLogInModal){
        return null;
    }
    return (
        <React.Fragment>
        <div className="modal-overlay"/>
            <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
              <div className="modalbox">
                <div className="modal-top">
                    <button type="button" className="modal-close-button ml-auto" data-dismiss="modal" aria-label="Close" onClick={() => props.showLogInModal(!props.showingLogInModal)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                {props.children}    
              </div>
            </div>
        </React.Fragment>

    );          
};


export default Modal;