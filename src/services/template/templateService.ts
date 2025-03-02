import { API } from "../../modules/api/api";
import { ITemplateResponse, ITemplatesResponse } from "./templateInterface";

export default class TemplateService {
    static async getAll(): Promise<Axios.AxiosXHR<ITemplatesResponse>> {
        return API.get<ITemplatesResponse>("/template");
    }

    static async create(data: FormData): Promise<Axios.AxiosXHR<ITemplateResponse>> {
        return API.post<ITemplateResponse>("/template/upload", data);
    }

    static async remove(id: number | string): Promise<void> {
        await API.delete(`/template/${id}`);
    }
}