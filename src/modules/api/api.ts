import axios from "axios";
import { SERVER_URL } from "../../constants";
import { IAuthResponse } from "../../services/user/userInterfaces";

export const API_URL = SERVER_URL + `api`;

export const API = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

API.interceptors.request.use((config) => {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

API.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem("token", response.data.accessToken);

            return API.request(originalRequest);
        } catch (error) {}
    }

    throw error;
});