import { SET_LOGIN_MODAL } from '../actionTypes';

const initialState = {
    showModal: false,
    showLoginModal: false
};

const ModalSwitcher = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_MODAL: {
            const { showLoginModal } = action.payload;
            return {
                ...state,
                showLoginModal: showLoginModal
            };
        }
        default:
            return state;
    }
}

export default ModalSwitcher;