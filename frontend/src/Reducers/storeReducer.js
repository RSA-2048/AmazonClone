import { USER_SIGNIN } from "../actions";

const storeReducer = (state, action) => {
    switch (action.type) {
        case USER_SIGNIN: {
            return { ...state, userInfo: action.payload };
        }
        default: return { ...state };
    }
}
export default storeReducer;