import React, {useState} from "react";
import CustomNavbar from "../components/Navbar";
import Form from "../components/LoginForm";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <CustomNavbar/>
            <div style={{margin: "250px auto"}}>
                <Form/>
            </div>
        </div>
    )
}

export default LoginPage;