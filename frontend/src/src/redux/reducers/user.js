import { SET_USER_LOGIN, LOG_OUT_USER } from '../actionTypes';



const initialState = {
    userLogedIn: localStorage.getItem("AuthorizationKey") != (null || "" ),
    authenticationKey: localStorage.getItem("AuthorizationKey")
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
        case LOG_OUT_USER: {
            const { userLogedIn } = action.payload;
            localStorage.setItem("AuthorizationKey", "")
            return {
                ...state,
                userLogedIn: userLogedIn,
                authenticationKey: ""
            }
        }
        default:
            return state;
    }
};

export default UserLogin;