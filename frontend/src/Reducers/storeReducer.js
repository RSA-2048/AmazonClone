import { ADD_TO_CART, USER_SIGNIN, USER_SIGNOUT, USER_SIGNUP } from "../actions";

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
        case ADD_TO_CART: {
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existingItem
                ? state.cart.cartItems.map((item) =>
                    item._id === existingItem._id ? newItem : item
                ) //סינטקס מוזר אבל הוא מחזיר את כל המערך, עם החלפה של את האייטם הישן בחדש
                : [...state.cart.cartItems, newItem];

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            return { ...state, cart: { ...state.cart, cartItems } };
        }
        default: return { ...state };
    }
}
export default storeReducer;