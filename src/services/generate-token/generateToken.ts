import { API } from "../../modules/api/api";
import { IGenerateTokenResponse, IGenerateTokensResponse } from "./generateTokenInterface";

export default class GenerateTokenService {
    static async getAllByUser(userId: number): Promise<Axios.AxiosXHR<IGenerateTokensResponse>> {
        return API.post("/generate-token/all", { userId });
    }

    static async create(userId: number, count: number): Promise<Axios.AxiosXHR<IGenerateTokenResponse>> {
        return API.post("/generate-token", { userId, count });
    }

    static async increaseCount(token: string, count: number): Promise<Axios.AxiosXHR<IGenerateTokenResponse>> {
        return API.put("/generate-token", { token, count });
    }

    static async getAll(): Promise<Axios.AxiosXHR<IGenerateTokensResponse>> {
        return API.get("/generate-token");
    }
}