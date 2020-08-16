import React, { useState } from "react";

import RegisterDatePicker from "../datepicker";

import { useMutation } from "@apollo/client";
import { REGISTER } from "../../requests/userRequests";

const RegisterModalForm = () => {
  const [updateRegistration, { data, error, loading }] = useMutation(REGISTER, {
    onError: () => {},
  });
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString());

  console.log(data, error, loading);

  const register = (event) => {
    event.preventDefault();
    const variableData = {
      variables:{
        input:{
          email:"torstein@otterlei.no",
          firstName:"torstein",
          lastName:"otterlei",
          password:"torstein123",
          birthDate:"2019-08-26T00:00:00",
        },
      },
    };
    console.log(variableData);
    updateRegistration(variableData);
  };

  return (
    <div className="col">
      <div className="row d-flex justify-content-center mt-5">
        <h2 className="">Register</h2>
      </div>
      <form onSubmit={(event) => register(event)}>
        <div className="row d-flex justify-content-center mt-5">
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
            <span className="ml-1">Password</span>
            <input
              className="navbar-search"
              type="password"
              placeholder="Type your password..."
              value={passwordInput}
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
              placeholder="Type your password..."
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
              value={lastNameInput}
              onChange={(event) => {
                setLastNameInput(event.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="row d-flex justify-content-center mt-4">
          <div className="container w-75">
            <span className="ml-1">Birthday</span>
            <div>
              <RegisterDatePicker
                startDate={new Date(startDate)}
                setStartDate={setStartDate}
              />
            </div>
          </div>
        </div>
        {error ? (
          <div style={{ color: "red" }}>
            Could not register. Try again with different information.{" "}
          </div>
        ) : null}
        <div className="row d-flex justify-content-center">
          <button className="signinbutton mt-5">Register</button>
        </div>
      </form>
    </div>
  );

};

export default RegisterModalForm;
