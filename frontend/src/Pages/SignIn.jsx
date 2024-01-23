import axios from 'axios';
import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Title from '../Components/Shared/Title';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/users/signin", { email: email, password: password });
            console.log(data);
        } catch (error) {
            console.log(error.response.data.message);
        }

    }

    return (
        <Container className='small-container'>
            <Title title="SignIn Page" />
            <h1 className='my-3'>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} placeholder=" Enter Password" ></Form.Control>
                </Form.Group>
            </Form>

        </Container >

    )
}

export default SignIn