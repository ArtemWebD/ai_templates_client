import { makeAutoObservable } from "mobx";
import { IWhitePage } from "../../services/white-page/whitePageInterface";
import WhitePageService from "../../services/white-page/whitePageService";
import APIStore from "../../modules/api-store/apiStore";

export default class WhitePageStore {
    whitePages: IWhitePage[] = [];
    json: string = "";

    private apiStore: APIStore;
    
    constructor(apiStore: APIStore) {
        makeAutoObservable(this);
        this.apiStore = apiStore;
    }

    pushWhitePage(whitePage: IWhitePage): void {
        this.whitePages.push(whitePage);
    }

    removeWhitePage(id: number): void {
        this.whitePages = this.whitePages.filter((whitePage) => whitePage.id !== id);
    }

    clearWhitePage(): void {
        this.whitePages = [];
    }

    setJson(json: string): void {
        this.json = json;
    }

    async upload(data: FormData): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await WhitePageService.upload(data);

            this.pushWhitePage(response.data.whitePage);
            
            this.apiStore.endRequest("Шаблон успешно добавлен");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async getAll(): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await WhitePageService.getAll();

            this.clearWhitePage();
            response.data.whitePages.forEach((whitePage) => this.pushWhitePage(whitePage));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            await WhitePageService.remove(id);

            this.removeWhitePage(id);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async getJson(id: number | string): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await WhitePageService.getJson(id);

            this.setJson(response.data.json);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async updateJson(id: number, json: string): Promise<void> {
        try {
            this.apiStore.startRequest();

            await WhitePageService.updateJson(id, json);

            this.setJson(json);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }
}