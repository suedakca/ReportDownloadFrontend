import axios from "axios";
import { decryptData } from "../features/utils/encryptData";

const loginApi = axios.create({
    baseURL: "http://localhost:8080", // backend URL
});

const movieApi = axios.create({
    baseURL: "http://localhost:8081"
});

const homeworkApi = axios.create({
    baseURL: "http://localhost:8082"
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
