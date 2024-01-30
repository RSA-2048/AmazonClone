import React from 'react'
import MessageBox from '../Shared/MessageBox'
import { Link } from 'react-router-dom'
import { Col, ListGroup, Row, Button } from '../../imports'


const ItemsInCart = ({ cartItems, updateCartHandler, removeProductHandler }) => {

    return (
        <div>
            {cartItems.length === 0 ? <MessageBox>Your cart is empty <Link to={'/'}>Go back to home page</Link></MessageBox>
                : <ListGroup>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item._id} className='mt-1 border'>
                            <Row>
                                <Col md={8}><img src={item.image} alt={item.title} className='img-fluid rounded img-thumbnail' />
                                    <Link to={`/product/${item.token}`}>{item.title}</Link>
                                </Col>
                                <Col md={2}><Button onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1} variant="light">
                                    <i className='fa fa-minus-circle' /></Button>
                                    {" "}
                                    <span>{item.quantity}</span>{" "}
                                    <Button onClick={() => updateCartHandler(item, item.quantity + 1)} variant="light">
                                        <i className='fa fa-plus-circle' /></Button>
                                </Col>
                                <Col md={1}>${item.price}</Col>
                                <Col md={1}><Button variant='light' onClick={() => removeProductHandler(item)}>
                                    <i className='fas fa-trash' />
                                </Button></Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>}
        </div>
    )
}

export default ItemsInCart