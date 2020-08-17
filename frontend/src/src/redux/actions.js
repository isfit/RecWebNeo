import { SET_LOGIN_MODAL, SET_USER_LOGIN, LOG_OUT_USER, ADD_POSITION, PRIORITIZE_POSITION, DEPRIORITIZE_POSITION, REMOVE_POSITION } from "./actionTypes";


// Modal
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

// User
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

// Application
export const addPositionToApplication = ( id, name ) => ({
    type: ADD_POSITION,
    payload: {
        positionId: id,
        positionName: name
    }
});

export const removePositionFromApplication = ( id ) => ({
    type: REMOVE_POSITION,
    payload: {
        positionId: id
    }
});

export const prioritizePosition = (id) => ({
    type: PRIORITIZE_POSITION,
    payload: {
        positionId: id
    }
});
export const dePrioritizePosition = (id) => ({
    type: DEPRIORITIZE_POSITION,
    payload: {
        positionId: id
    }
});
