import { SET_USER_LOGIN } from '../actionTypes';

const initialState = {
    userLogedIn: false,
    authenticationKey: null
};

const UserLogin = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGIN: {
            const { userLogedIn, authenticationKey } = action.payload;
            return {
                ...state,
                userLogedIn: userLogedIn,
                authenticationKey: authenticationKey
            }
        };
        default:
            return state;
    }
};

export default UserLogin;