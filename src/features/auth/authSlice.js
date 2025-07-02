import { createSlice } from "@reduxjs/toolkit";
import {decryptData, encryptData} from "../utils/encryptData";
const localToken = localStorage.getItem("token");
const localUsername = localStorage.getItem("username");

const initialState = {
    token: localToken ? decryptData(localToken) : null,
    username: localUsername ? decryptData(localUsername) : null
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
        refreshPage : (state) => {
            console.log("State geçerli");
        }
    }
});


export const {setCredentials, logout, refreshPage } = authSlice.actions;
export default authSlice.reducer;
