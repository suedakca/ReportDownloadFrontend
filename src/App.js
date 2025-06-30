import React, {useEffect, useState} from "react";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import AuthPage from "./pages/AuthPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./components/PrivateRoute";
import {useDispatch, useSelector} from "react-redux";
import HomeworkPage from "./pages/HomeworkPage";
import HomePage from "./pages/HomePage";


function App() {
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.username);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (isChecking) return;
        if(!token || !username) {
            if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
                console.log('Token veya kullanıcı bulunamadı, login sayfasına yönlendiriliyor.');
                navigate('/');
            } else{
                setIsChecking(true); return;
            }
        }
        setIsChecking(true);
        fetch(`/auth/check?token=${encodeURIComponent(token)}&username=${encodeURIComponent(username)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sunucu hatası: ' + response.status);
                }
                return response.text();
            })
            .then(text => {
                const isValid = text === 'true';
                if(!isValid) {
                    console.log('Token geçersiz veya kullanıcı bulunamadı. Logout yapılıyor...');
                    dispatch({type: 'logout'});
                    navigate('/');
                } else{
                    console.log('Token geçerli. Redux refresh ediliyor...');
                    dispatch({type : 'refreshPage'});
                }
            })
            .catch(error => {
                console.error('Hata oluştu: ', error);
                dispatch({type: 'logout'});
                navigate("/");
            })
    }, [token, username, navigate, dispatch, isChecking]);
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        token ? <Navigate to="/home" replace /> : <AuthPage pageName='Login' />
                    }
                />
                <Route
                    path="/movie"
                    element={
                        <PrivateRoute>
                            <MoviePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/homework"
                    element={
                        <PrivateRoute>
                            <HomeworkPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />

                <Route path="/register"
                       element={
                    <AuthPage pageName='Register'/>
                       }
                />
            </Routes>
        </div>
    );
}

export default App;
