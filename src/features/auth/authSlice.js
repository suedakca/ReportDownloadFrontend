import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("username", action.payload.username);
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
