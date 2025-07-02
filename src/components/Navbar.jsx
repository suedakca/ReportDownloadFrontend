import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar } from "react-bootstrap";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../features/utils/encryptData";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function CustomNavbar({ type }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    useEffect(() => {
        const tokenEncrypted = localStorage.getItem("token");
        if (tokenEncrypted) {
            const token = decryptData(tokenEncrypted);
            console.log("TOKEN:", token);
            try {
                const decoded = jwtDecode(token);
                console.log("DECODED:", decoded);
                setRole(decoded.roles[0]);
            } catch (err) {
                console.error("Token decode hatası:", err);
            }
        }
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {type !== null ? (
                    <>
                        <Navbar.Brand href="#">Homework Report</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {role === null ? null : role === "ROLE_DIRECTOR" ? (
                                    <Nav.Link as={Link} to="/movie">Movie</Nav.Link>
                                ) : role === "ROLE_TEACHER" ? (
                                    <Nav.Link as={Link} to="/homework">Homework</Nav.Link>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/movie">Movie</Nav.Link>
                                        <Nav.Link as={Link} to="/homework">Homework</Nav.Link>
                                    </>
                                )}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                ) : (
                    <>
                        <Navbar.Brand href="#">Homework Report</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;