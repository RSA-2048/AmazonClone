import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../Store.jsx';
import axios from 'axios';
import descriptionPageReducer from '../Reducers/descriptionPageReducer';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../actions';
import { addToCartHandler, getError } from '../utils.js';
import Loading from '../Components/Shared/Loading.jsx';
import MessageBox from '../Components/Shared/MessageBox.jsx';
import { Col, Row } from '../imports';
import ProductDescription from '../Components/DescriptionPage/ProductDescription.jsx';
import CartDescription from '../Components/DescriptionPage/CartDescription.jsx';
import Title from '../Components/Shared/Title.jsx';

const initialState = { loading: true, error: "", data: [] };

const DescriptionPage = () => {
    const [{ loading, error, data }, dispatch] = useReducer(descriptionPageReducer, initialState);
    const params = useParams();
    const { token } = params;
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    useEffect(() => {
        const getProduct = async () => {
            dispatch({ type: GET_REQUEST })
            try {
                const { data } = await axios.get(`/api/v1/products/token/${token}`);
                dispatch({ type: GET_SUCCESS, payload: data });
            } catch (error) {
                console.log(error);
                dispatch({ type: GET_FAIL, payload: getError(error) });
            }
        }
        getProduct();
    }, [token]) // will call useEffect in the first render and when the token is changed

    const addToCart = async () => {
        await addToCartHandler(data, cartItems, ctxDispatch);
        navigate("/cart");
    }

    return (
        <div><Title title={data.title} />
            {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
                <div>
                    <Row>
                        <Col md={6}>
                            <img width={400} src={data.image} alt={data.title} />
                        </Col>
                        <Col md={3}>
                            <ProductDescription {...data} />
                        </Col>
                        <Col md={3}>
                            <CartDescription addToCart={addToCart} product={data} />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}

export default DescriptionPage