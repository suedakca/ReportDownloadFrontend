import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import AuthPage from "./pages/AuthPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import HomeworkPage from "./pages/HomeworkPage";
import HomePage from "./pages/HomePage";
import { decryptData } from "./features/utils/encryptData";
import {logout, refreshPage, setCredentials} from "./features/auth/authSlice";

function App() {
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.username);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        const tokenEncrypted = localStorage.getItem("token");
        if (!token && tokenEncrypted) {
            const rawToken = decryptData(tokenEncrypted);
            try {
                const decoded = JSON.parse(atob(rawToken.split(".")[1]));
                dispatch(setCredentials({
                    token: rawToken,
                    username: decoded.sub
                }));
            } catch (e) {
                console.error("Token parse edilemedi", e);
                dispatch(logout());
                navigate("/");
                return;
            }
        }
    }, [token, dispatch, navigate]);

    useEffect(() => {
        if (isChecking || !token || !username) return;

        setIsChecking(true);

        fetch(`/auth/check?token=${encodeURIComponent(token)}&username=${encodeURIComponent(username)}`)
            .then(response => {
                if (!response.ok) throw new Error('Sunucu hatası: ' + response.status);
                return response.text();
            })
            .then(text => {
                if (text !== "false") {
                    console.log('Token geçerli. Redux güncellendi.');
                    dispatch(refreshPage());
                } else {
                    console.log('Token geçersiz. Logout yapılıyor.');
                    dispatch(logout());
                    navigate('/');
                }
            })
            .catch(error => {
                console.error("Hata oluştu:", error);
                dispatch(logout());
                navigate("/");
            });
    }, [token, username, isChecking, dispatch, navigate]);

    return (
        <Routes>
            <Route path="/" element={
                token ? <Navigate to="/home" replace /> : <AuthPage pageName='Login' />
            }/>
            <Route path="/movie" element={<PrivateRoute><MoviePage /></PrivateRoute>} />
            <Route path="/homework" element={<PrivateRoute><HomeworkPage /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/register" element={<AuthPage pageName='Register' />} />
        </Routes>
    );
}

export default App;