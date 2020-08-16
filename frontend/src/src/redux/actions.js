import { SET_LOGIN_MODAL } from "./actionTypes";

export const setLoginModal = showLoginModal => ({
    type: SET_LOGIN_MODAL,
    payload: {
        showLoginModal
    }
});