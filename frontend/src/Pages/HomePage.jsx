import React, { useEffect, useReducer } from 'react'
import Title from '../Componenets/Shared/Title'
import homePageReducer from '../Reducers/homePageReducer'
import axios from 'axios';

const initialState = { loading: true, error: '', data: [] };

const HomePage = () => {
    const [state, dispatch] = useReducer(homePageReducer, initialState);
    useEffect(() => {
        const getProducts = async () => {
            dispatch({ type: "GET_REQUEST" });
            try {
                const { data } = await axios.get("http://localhost:8080/api/v1/products");
                dispatch({ type: "GET_SUCCESS", payload: data });
                console.log(data);
            } catch (error) {
                dispatch({ type: "GET_FAIL", payload: error });
                console.log(state.error);
            }
        };
        getProducts();
    }, [])

    return (
        <div><Title title="Home Page" />
            <div className='backgroundHomePage'>
                <img style={{ width: "100%" }} src="https://m.media-amazon.com/images/I/81d5OrWJAkL.SX3000.jpg" alt='background image'></img>
            </div>
            <div className='products'>

            </div>
        </div>
    )
}

export default HomePage