import { API } from "../../modules/api/api";
import { ISiteResponse, ISitesResponse } from "./siteInterface";

export default class SiteService {
    static async getAll(): Promise<Axios.AxiosXHR<ISitesResponse>> {
        return API.get<ISitesResponse>("/site");
    }

    static async create(title: string, templateId: number): Promise<Axios.AxiosXHR<ISiteResponse>> {
        return API.post<ISiteResponse>("/site/upload", { title, templateId });
    }

    static async remove(id: number | string): Promise<void> {
        await API.delete(`/site/${id}`);
    }
}