import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store';
import Title from '../Components/Shared/Title';
import CheckoutSteps from '../Components/Shared/CheckoutSteps';
import { Container, Form, Button } from '../imports';
import { SAVE_SHIPPING_ADDRESS } from '../actions';

const ShippingPage = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, cart: { cartItems } } = state;

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
        if (!userInfo) {
            navigate("/sigin?redirect=/shipping")
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        ctxDispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
        navigate("/payment");
        console.log(data);
    }


    return (
        <div>
            <Title title="Shipping Details"></Title>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <Container className='small-container'>
                <h1 className='my-3'>Shipping Adress</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control name='fullName' required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Address:</Form.Label>
                        <Form.Control name='address' required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>City:</Form.Label>
                        <Form.Control name='city' required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Postal Code:</Form.Label>
                        <Form.Control name='postalCode' required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Country:</Form.Label>
                        <Form.Control name='country' required />
                    </Form.Group>
                    <div className='mb-3'><Button variant='primary' type='submit'>Submit</Button></div>
                </Form>
            </Container>
        </div>
    )
}

export default ShippingPage