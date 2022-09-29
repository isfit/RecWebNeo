import React, { useState } from "react";

import RegisterDatePicker from "../datepicker";

import { useMutation } from "@apollo/client";
import { REGISTER } from "../../requests/userRequests";

const RegisterModalForm = ({setShowModal}) => {
  const [updateRegistration, { data, error, loading }] = useMutation(REGISTER, {
    onError: () => {},
  });
  const [emailInput, setEmailInput] = useState("");
  const [phonenumberInput, setPhonenumberInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordSecondInput, setPasswordSecondInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const [passwordsMatchMessage, setPasswordsMatchMessage] = useState(false);
  const [viewConfirmation, setViewConfirmation] = useState(true);

  const register = (event) => {
    event.preventDefault();
    const variableData = {
      variables: {
        input: {
          email: emailInput,
          phoneNumber: phonenumberInput,
          firstName: firstNameInput,
          lastName: lastNameInput,
          password: passwordInput,
        }
      }
    };
    if (passwordInput === passwordSecondInput){
      updateRegistration(variableData)
    }
  };

  if (viewConfirmation) {
    return (
      <div className="col">
        <div className="row d-flex justify-content-center mt-5">
          <img src="./isfitlogo.png" className="header-brand-img mb-3" alt="ISFiT Logo" style={{ maxHeight: "60px" }}></img>
          <p>Before you proceed, please note that the positions listed on this page are for arranging and organizing the festival, 
            and therefore you have to be a student in Trondheim in order to apply for them.
          </p>
          <p className="mt-4">
            If you want to attend ISFiT as a participant, please apply at the <a href="https://participant.isfit.org/">Participant website</a>
          </p>
        </div>
        <div className="flex-grid mt-5" style={{justifyContent:"space-between"}}>
          <button className="btn btn-back mr-2" onClick={() => setShowModal()}>Back</button>
          <button className="btn btn-continue" onClick={() => setViewConfirmation(false)}>I confirm that I am a student that is currently or will be living in Trondheim in the near future</button>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="col">
        <div className="row d-flex justify-content-center mt-5">
          <h2 className="">Register</h2>
        </div>
        <form onSubmit={(event) => register(event)}>
          <div className="row d-flex justify-content-center mt-4">
            <div className="container w-75">
              <span className="ml-1">Email</span>
              <input
                className="navbar-search"
                placeholder="Type your email..."
                type="email"
                value={emailInput}
                onChange={(event) => {
                  setEmailInput(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="container w-75">
              <span className="ml-1">Phone Number</span>
              <input
                className="navbar-search"
                placeholder="Type your phonenumber"
                type="tel"
                required
                value={phonenumberInput}
                onChange={(event) => {
                  setPhonenumberInput(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="container w-75">
              <span className="ml-1">Password</span>
              <input
                className="navbar-search"
                type="password"
                required
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                onChange={(event) => setPasswordInput(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="container w-75">
              <span className="ml-1">Repeat password</span>
              <input
                className="navbar-search"
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
                onChange={(event) => setPasswordSecondInput(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="container w-75">
              <span className="ml-1">First name</span>
              <input
                className="navbar-search"
                placeholder="Type your first name..."
                value={firstNameInput}
                required
                onChange={(event) => {
                  setFirstNameInput(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <div className="container w-75">
              <span className="ml-1">Last name</span>
              <input
                className="navbar-search"
                placeholder="Type your last name..."
                required
                value={lastNameInput}
                onChange={(event) => {
                  setLastNameInput(event.target.value);
                }}
              ></input>
            </div>
          </div>
          
          {data ? (
            <div style={{ color: "green" }}>
              You are registered successfully. Please sign in. {" "}
            </div>
          ) : null}

          {error ? (
            <div style={{ color: "red" }}>  
              Could not register. Try again with different information.{" "}
            </div>
          ) : null}

          {passwordInput === passwordSecondInput ? null : <small style={{ color: "red" }}>The passwords you have entered does not match</small>}

          <div className="row d-flex justify-content-center">
            <button className="signinbutton mt-5">Register</button>
          </div>
        </form>
      </div>
    );
  }

};

export default RegisterModalForm;
