import { SET_LOGIN_MODAL, SET_POSITION_MODAL, SET_USER_LOGIN, LOG_OUT_USER } from "./actionTypes";

export const openLoginModal = () => ({
    type: SET_LOGIN_MODAL,
    payload: {
        showLoginModal: true
    }
});

export const closeLoginModal = () => ({
    type: SET_LOGIN_MODAL,
    payload: {
        showLoginModal: false
    }
})

export const openPositionModal = () => ({
    type: SET_POSITION_MODAL,
    payload: {
        showPositionModal: true
    }
});

export const closePositionModal = () => ({
    type: SET_POSITION_MODAL,
    payload: {
        showPositionModal: false
    }
})

export const logOutUser = () => ({
    type: LOG_OUT_USER,
    payload: {
        userLogedIn: false
    }
});

export const setUserLogin = (userLogedIn, authenticationKey) => ({
    type: SET_USER_LOGIN,
    payload: {
        userLogedIn,
        authenticationKey
    }
});