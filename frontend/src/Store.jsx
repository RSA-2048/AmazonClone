import { createContext, useReducer } from "react";
import storeReducer from "./Reducers/storeReducer";

export const Store = createContext()
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAdress: localStorage.getItem('shippingAdress') ? JSON.parse(localStorage.getItem('shippingAdress')) : {},
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : "",

    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    const body = { state, dispatch };
    return <Store.Provider value={body}>{children}</Store.Provider>
}