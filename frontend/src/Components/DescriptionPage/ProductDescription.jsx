import React from 'react'
import { ListGroup } from '../../imports'
import Rating from '../Shared/Rating'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

const ProductDescription = ({ title, rating, price, description }) => {
    return (
        <ListGroup>
            <ListGroup.Item>
                <h1 style={{ wordWrap: "break-word" }}>{title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating rating={rating.rate} numReviews={rating.count}></Rating>
            </ListGroup.Item>
            <ListGroupItem>
                Price: ${price}
            </ListGroupItem>
            <ListGroupItem>
                Description: <p className='lead' style={{ wordWrap: "break-word" }}>${description}</p>
            </ListGroupItem>
        </ListGroup >
    )
}

export default ProductDescription