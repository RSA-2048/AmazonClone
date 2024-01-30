import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Container from "react-bootstrap/Container"
import Title from "../Components/Shared/Title"
import Form from "react-bootstrap/Form"
import { Button, Link, toast } from "../imports"
import { getError } from "../utils"
import { useLocation, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { USER_SIGNIN } from "../actions"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(Store);
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search);
    const redirectValue = redirectUrl.get("redirect");
    const redirect = redirectValue ? redirectValue : '/';

    useEffect(() => {
        if (userInfo)
            navigate(redirect);
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/users/signin", { email: email, password: password });
            ctxDispatch({ type: USER_SIGNIN, payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate(redirect);
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
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
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