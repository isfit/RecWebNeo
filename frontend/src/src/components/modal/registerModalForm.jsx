import React from 'react';

const RegisterModalForm = () => {
    return(
        <div className="col">
            <div className="row d-flex justify-content-center mt-5">
                <h2 className="" >Register</h2>
            </div>
            <div className="row d-flex justify-content-center mt-5">
                <div className="container w-75">
                    <span className="ml-1">Email</span>
                    <input className="navbar-search" placeholder="Type your username..."></input>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
                <div className="container w-75">
                    <span className="ml-1">Password</span>
                    <input className="navbar-search" type="password" placeholder="Type your password..."></input>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
                <div className="container w-75">
                    <span className="ml-1">Repeat password</span>
                    <input className="navbar-search" type="password" placeholder="Type your password..."></input>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
                <div className="container w-75">
                    <span className="ml-1">First name</span>
                    <input className="navbar-search" placeholder="Type your first name..."></input>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
                <div className="container w-75">
                    <span className="ml-1">Last name</span>
                    <input className="navbar-search" placeholder="Type your last name..."></input>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
                <div className="container w-75">
                    <span className="ml-1">Birthdate</span>
                    <input className="navbar-search" placeholder="Type your password..."></input>
                </div>
            </div>


            <div className="row d-flex justify-content-center mt-5">
                    <button className="signinbutton mt-5">Sign in</button>
            </div>
        </div>
    )
}

export default RegisterModalForm;