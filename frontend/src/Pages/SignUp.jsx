import { useContext, useState } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Title from "../Components/Shared/Title"
import Form from "react-bootstrap/Form"
import { Button, Link, toast } from "../imports"
import { getError } from "../utils"
import { useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { USER_SIGNUP } from "../actions"

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { dispatch: ctxDispatch } = useContext(Store)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            toast.error("Failed Confirm Password");
        }
        try {
            const { data } = await axios.post("/api/v1/users/signup", { name: name, email: email, password: password });
            ctxDispatch({ type: USER_SIGNUP, payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
        } catch (error) {
            toast.error(getError(error));
        }
    }

    return (
        <Container className="small-container">
            <Title title="SignUp Page" />
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control required onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign Up</Button>
                </div>
            </Form>
        </Container>
    )
}

export default SignUp