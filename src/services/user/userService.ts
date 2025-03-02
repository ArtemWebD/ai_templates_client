import axios from "axios";
import { API, API_URL } from "../../modules/api/api";
import { IAdminValidation, IAuthResponse, IUsersResponse } from "./userInterfaces";

export default class UserService {
    static async login(email: string, password: string): Promise<Axios.AxiosXHR<IAuthResponse>> {
        const response = await API.post<IAuthResponse>("/auth/login", { email, password });

        return response;
    }

    static async register(email: string, name: string, password: string): Promise<Axios.AxiosXHR<IAuthResponse>> {
        const response = await API.post<IAuthResponse>("/auth/registration", { email, name, password });

        return response;
    }

    static async refresh(): Promise<Axios.AxiosXHR<IAuthResponse>> {
        const response = await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });

        return response;
    }

    static async checkAdmin(): Promise<Axios.AxiosXHR<IAdminValidation>> {
        const response = await API.get<IAdminValidation>("/auth/admin");

        return response;
    }

    static async getAll(): Promise<Axios.AxiosXHR<IUsersResponse>> {
        return API.get("/auth/users");
    }
}