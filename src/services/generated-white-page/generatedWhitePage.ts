import { API } from "../../modules/api/api";
import { IGeneratedWhitePagesResponse } from "./generatedWhitePageInterface";

export default class GeneratedWhitePageService {
    static async create(id: number, prompt: string): Promise<void> {
        await API.post("/white-page/create", { id, prompt }, {
            headers: {
                "Generate-Token": localStorage.getItem("generateToken")
            }
        });
    }

    static async getAll(): Promise<Axios.AxiosXHR<IGeneratedWhitePagesResponse>> {
        return API.get<IGeneratedWhitePagesResponse>("/generated-white-page");
    }
}