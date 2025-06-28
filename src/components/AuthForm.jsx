import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Stack } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import {loginApi} from "../api/axios";

function AuthForm({ urlPath, pageName }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (pageName === 'Login') {
                response = await loginApi.post(urlPath, {
                    username,
                    password
                });
            } else {
                response = await loginApi.post(urlPath, {
                    username,
                    password,
                    role
                })
                console.log("ROLE: ", role);
            }

            console.log(pageName," success: ", response.data);

            dispatch(setCredentials({
                token: response.data.token,
                username: response.data.username
            }));

            navigate("/homework");
        } catch (error) {
            console.error("Error: ",pageName," ",error);
        }
    };

    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            <Row>
                <Form onSubmit={handleAuth}  style ={{
                    position: "absolute",
                    width: "500px",
                    left: "35%",
                    top: "40%"
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
                    {pageName === 'Register' && (
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextRole">
                            <Form.Label column sm="2">Role</Form.Label>
                            <Col sm="10">
                                <Form.Select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="USER">Kullanıcı</option>
                                    <option value="TEACHER">Öğretmen</option>
                                    <option value="DIRECTOR">Yönetmen</option>
                                    <option value="ADMIN">Admin</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    )}

                    <Button type="submit" variant="secondary" style ={{
                        position: "absolute",
                        top: "110%",
                        left: "45%"
                    }}>{pageName}</Button>
                </Form>
            </Row>
        </Stack>
    );
}

export default AuthForm;
