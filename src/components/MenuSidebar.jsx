import React from 'react';
import { Nav } from 'react-bootstrap';
import '../App.css';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../features/auth/authSlice";
import {decryptData} from "../features/utils/encryptData";

const MenuSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameEncrypted = localStorage.getItem("username");
    const username = decryptData(usernameEncrypted);
    const handleLogout = () => {
        dispatch(logout);
        navigate("/");
    };

    return (
        <div className="sidebar">
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="">Welcome {username}</Nav.Link>
                <Nav.Link href="">🏠 Home</Nav.Link>
                <Nav.Link href="/homework">📄 Homeworks</Nav.Link>
                <Nav.Link href="/movie">🎬 Movies</Nav.Link>
                <Nav.Link href="/settings">⚙️ Settings</Nav.Link>
                <Nav.Link href="#" onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}>
                    🚪 Logout
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default MenuSidebar;