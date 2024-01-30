import React, { useContext } from 'react'
import { Store } from '../Store';
import Title from '../Components/Shared/Title';
import { Col, Row } from '../imports';
import ItemsInCart from '../Components/CartPage/ItemsInCart';
import Checkout from '../Components/CartPage/Checkout';

const CartPage = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const updateCartHandler = async () => {

    }

    return (
        <div>
            <Title title={"Shopping Cart"}></Title>
            <Row>
                <Col md={8}><ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler}></ItemsInCart></Col>
                <Col md={4}><Checkout cartItems={cartItems}></Checkout></Col>
            </Row>
        </div>
    )
}

export default CartPage