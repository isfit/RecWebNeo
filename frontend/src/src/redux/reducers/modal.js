import { SET_LOGIN_MODAL, SET_POSITION_MODAL} from '../actionTypes';

const initialState = {
    showModal: false,
    showLoginModal: false,
    showPositionModal: false,
};

const ModalSwitcher = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSITION_MODAL: {
            const { showPositionModal } = action.payload;
            return {
                ...state,
                showPositionModal: showPositionModal
            };
        }
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