import { USER_SIGNIN, USER_SIGNOUT, USER_SIGNUP } from "../actions";

const storeReducer = (state, action) => {
    switch (action.type) {
        case USER_SIGNIN || USER_SIGNUP: {
            return { ...state, userInfo: action.payload };
        }
        case USER_SIGNOUT: {
            // local storage remove item 
            // set user context to null
            return { ...state, userInfo: null };
        }
        default: return { ...state };
    }
}
export default storeReducer;