import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button, Stack} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        let navigate = useNavigate;
        try {
            const response = await axios.post("/auth/login", {
                username: username,
                password: password
            });

            console.log("Giriş başarılı:", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/download");
        } catch (error) {
            console.error("Giriş hatası:", error);
        }
    };

    return (
    <Stack gap={2} className="col-md-5 mx-auto">
        <Row>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Username</Form.Label>
                    <Col sm="10">
                        <Form.Control type="username"
                                      placeholder="Username"
                                      value={username}
                                      onChange={(e) => setUsername(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">Password</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password"
                                      placeholder="Password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="secondary">Login</Button>
            </Form>
        </Row>
    </Stack>
    );
}

export default LoginForm;