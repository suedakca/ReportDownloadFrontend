import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Navbar} from "react-bootstrap";
function CustomNavbar() {
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/">Homework Report</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
export default CustomNavbar;