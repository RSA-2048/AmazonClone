import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Row className='checkout-steps'>
            <Col className={step1 ? "active" : ""}>Sign In</Col>
            <Col className={step2 ? "active" : ""}>Shipping</Col>
            <Col className={step3 ? "active" : ""}>Payment</Col>
            <Col className={step4 ? "active" : ""}>Place Order</Col>
        </Row >
    )
}

export default CheckoutSteps