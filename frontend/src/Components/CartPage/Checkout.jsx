import React from 'react'
import { Card, ListGroup, Button } from '../../imports'


const Checkout = ({ cartItems, checkOutHandler }) => {
    return (
        <Card>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Subtotal{" ("}
                            {cartItems.reduce((a, c) => a + c.quantity, 0)}
                            {cartItems.length === 1 ? "Item): " : "Items): "}$
                            {" "}
                            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='d-grid'>
                            <Button type='button' disabled={cartItems.length === 0} variant='primary' onClick={() => checkOutHandler()}>Check Out</Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default Checkout