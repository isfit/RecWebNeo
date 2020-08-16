import { SET_MODAL } from '../actionTypes';

const initialState = {
    userLogedIn: false,
    authenticationKey: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "Tull": {
            const { showModal } = action.payload;
            return {
                ...state,
                showModal: showModal
            }
        };
        default:
            return state;
    }
}