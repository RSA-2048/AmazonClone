import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { SAVE_PAYMENT_METHOD } from '../actions';
import Title from '../Components/Shared/Title';
import CheckoutSteps from '../Components/Shared/CheckoutSteps';
import { Button, Form } from '../imports';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingAddress, paymentMethod, cartItems }, userInfo } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');

    const submitHandler = (e) => {
        e.preventDefault();

        ctxDispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        console.log(state);
        navigate('/placeorder');
    }

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
        }
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [cartItems, navigate, shippingAddress, userInfo])

    return (
        <div>
            <Title title='Payment' />
            <CheckoutSteps step1 step2 step3 />
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check type='radio' id='PayPal' label='PayPal' value='PayPal' checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <Form.Check type='radio' id='Stripe' label='Stripe' value='Stripe' checked={paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <Button type="sumbit">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default PaymentPage