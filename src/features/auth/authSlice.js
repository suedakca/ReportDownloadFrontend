import { createSlice } from "@reduxjs/toolkit";
import {decryptData, encryptData} from "../utils/encryptData";

const initialState = {
    token: decryptData(localStorage.getItem("token")) || null,
    username: decryptData(localStorage.getItem("username")) || null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem("token", encryptData(action.payload.token));
            localStorage.setItem("username", encryptData(action.payload.username));
        },
        logout: (state) => {
            state.token = null;
            state.username = null;
            localStorage.removeItem("token");
            localStorage.removeItem("username");
        },
        refreshPage : (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
