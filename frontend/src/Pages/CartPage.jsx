import React, { useContext } from 'react'
import { Store } from '../Store';
import Title from '../Components/Shared/Title';
import { Col, Row, axios, toast } from '../imports';
import ItemsInCart from '../Components/CartPage/ItemsInCart';
import Checkout from '../Components/CartPage/Checkout';
import { ADD_TO_CART, REMOVE_PRODUCT } from '../actions';
import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;
    const navigate = useNavigate();

    const checkOutHandler = () => {
        navigate("/signin?redirect=/shipping");
    };

    const updateCartHandler = async (product, quantity) => {
        try {
            const { data } = await axios.get(`/api/v1/products/${product._id}`);

            if (data.countInStock < quantity) {
                alert('Sorry, Product is out of stock');
                return;
            }
            ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });

        } catch (err) {
            toast.error(getError(err));
        }
    };

    const removeProductHandler = async (product) => {
        ctxDispatch({ type: REMOVE_PRODUCT, payload: product });
    };



    return (
        <div>
            <Title title={"Shopping Cart"}></Title>
            <Row>
                <Col md={8}><ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler} removeProductHandler={removeProductHandler}></ItemsInCart></Col>
                <Col md={4}>
                    <Checkout cartItems={cartItems} checkOutHandler={checkOutHandler}></Checkout></Col>
            </Row>
        </div>
    )
}

export default CartPage