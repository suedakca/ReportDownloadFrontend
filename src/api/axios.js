import axios from "axios";
import { decryptData } from "../features/utils/encryptData";

const loginApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // backend URL
});

const movieApi = axios.create({
    baseURL: process.env.REACT_APP_MOVIE_URL
});

const homeworkApi = axios.create({
    baseURL: process.env.REACT_APP_HOMEWORK_URL
})
const addAuthInterceptor = (apiInstance) => {
    apiInstance.interceptors.request.use(
        (config) => {
            const token = decryptData(localStorage.getItem("token"));
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

addAuthInterceptor(loginApi);
addAuthInterceptor(movieApi);
addAuthInterceptor(homeworkApi);

export { loginApi, movieApi, homeworkApi };
