import {Button, Stack} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../features/auth/authSlice";

function RegisterForm () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e)  => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/register',{
                username,
                password
            });

            console.log("Kayıt başarılı");

            dispatch(setCredentials({
                token: response.data.token,
                username: response.data.username
            }));
            navigate("/download");
        } catch (e) {

        }
    }
    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            <Row>
                <Form onSubmit={handleRegister} style ={{
                    position: "absolute",
                    width: "500px",
                    left: "35%"
                }}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Username</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="secondary" style ={{
                        position: "absolute",
                        top: "110%",
                        left: "48%"
                    }}>Register</Button>
                </Form>
            </Row>
        </Stack>

    )
}

export default RegisterForm;