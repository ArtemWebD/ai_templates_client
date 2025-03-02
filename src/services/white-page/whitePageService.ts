import { API } from "../../modules/api/api";
import { IWhitePageJSONResponse, IWhitePageResponse, IWhitePagesResponse } from "./whitePageInterface";

export default class WhitePageService {
    static async getAll(): Promise<Axios.AxiosXHR<IWhitePagesResponse>> {
        return API.get<IWhitePagesResponse>("/white-page");
    }

    static async upload(data: FormData): Promise<Axios.AxiosXHR<IWhitePageResponse>> {
        return API.post<IWhitePageResponse>("/white-page/upload", data);
    }

    static async remove(id: number | string): Promise<void> {
        await API.delete(`/white-page/${id}`);
    }

    static async getJson(id: number | string): Promise<Axios.AxiosXHR<IWhitePageJSONResponse>> {
        return API.get<IWhitePageJSONResponse>(`/white-page/json${id}`);
    }

    static async updateJson(id: number, json: string): Promise<void> {
        await API.put("/white-page/json", { id, json });
    }
}