import { useState } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Title from "../Components/Shared/Title"
import Form from "react-bootstrap/Form"
import { Button, Link, toast } from "../imports"
import { getError } from "../utils"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/users/signin", { email: email, password: password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/");
        } catch (error) {
            toast.error(getError(error));
        }

    }
    return (
        <Container className="small-container">
            <Title title="SignIn Page" />
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer? {" "}
                    <Link to="/signup">Create your account</Link>
                </div>
                <div className="mb-3">
                    Forgot your Password?{" "}
                    <Link to="/reset">Reset password</Link>
                </div>
            </Form>
        </Container>
    )
}

export default SignIn