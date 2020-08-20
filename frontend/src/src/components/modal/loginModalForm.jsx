import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../../requests/userRequests';

import { connect } from "react-redux";
import { setUserLogin } from "../../redux/actions";

const LoginModalForm = ({ setShowModal, setUserLogin }) => {
    
    const [updateLogin, { data, error }] = useMutation(LOGIN, { onError: () => {} });
    const [ emailInput, setEmailInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");

    
    const login = (event) => {
        event.preventDefault();
        updateLogin({variables: {email: emailInput, password: passwordInput}});
    };

    if (data != null) {
        localStorage.setItem("AuthorizationKey", data.login)
        setUserLogin(true, data.login);
        setShowModal(false);
    }

    return(
        <div className="col">
            <div className="row d-flex justify-content-center mt-5">
                <h2 className="" >Sign in</h2>
            </div>
            <form onSubmit={event => login(event)}>
                <div className="row d-flex justify-content-center mt-5">
                    <div className="container w-75">
                        <span className="ml-1">Email</span>
                        <input className="navbar-search" placeholder="Type your email..." type="email" value={emailInput} onChange={event => {setEmailInput(event.target.value)}} />
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-4">
                    <div className="container w-75">
                        <span className="ml-1">Password</span>
                        <input className="navbar-search" type="password" placeholder="Type your password..." value={passwordInput} onChange={event => setPasswordInput(event.target.value)} />
                    </div>
                </div>
                { error ? <div style={{color: "red"}}>The email or password is invalid</div> : null }
                <div className="row d-flex justify-content-center mt-5">
                        <button className="signinbutton mt-5">Sign in</button>
                </div>
            </form>
        </div>
    )   
}
  
export default connect(null, { setUserLogin })(LoginModalForm);

