import { SET_LOGIN_MODAL, SET_USER_LOGIN } from "./actionTypes";

export const setLoginModal = showLoginModal => ({
    type: SET_LOGIN_MODAL,
    payload: {
        showLoginModal
    }
});

export const setUserLogin = (userLogedIn, authenticationKey) => ({
    type: SET_USER_LOGIN,
    payload: {
        userLogedIn,
        authenticationKey
    }
});