import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Navbar} from "react-bootstrap";
import {logout} from "../features/auth/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {decryptData} from "../features/utils/encryptData";
import {jwtDecode} from "jwt-decode";
function CustomNavbar( {type}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let role = "";
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    const tokenEncrypted = localStorage.getItem("token");
    const token = decryptData(tokenEncrypted);
    if(token !== null ) {
        const decoded = jwtDecode(token);
        role = decoded.roles[0];
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {type !== null ? (
                    <>
                        <Navbar.Brand href="#">Homework Report</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {role === "ROLE_DIRECTOR" ? (
                                    <Nav.Link href="/movie">Movie</Nav.Link>
                                ) : role === "ROLE_TEACHER" ? (
                                    <Nav.Link href="/homework">Homework</Nav.Link>
                                ) : (
                                    <>
                                        <Nav.Link href="/movie">Movie</Nav.Link>
                                        <Nav.Link href="/homework">Homework</Nav.Link>
                                    </>
                                )}
                                <Nav.Link
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </Nav.Link>
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
                                <Nav.Link href="/register" > Register </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )
                }
            </Container>
        </Navbar>
    );
}
export default CustomNavbar;