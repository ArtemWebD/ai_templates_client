import { makeAutoObservable } from "mobx";
import { IGeneratedWhitePage } from "../../services/generated-white-page/generatedWhitePageInterface";
import GeneratedWhitePageService from "../../services/generated-white-page/generatedWhitePage";
import APIStore from "../../modules/api-store/apiStore";

export default class GeneratedWhitePageStore {
    whitePages: IGeneratedWhitePage[] = [];

    private apiStore: APIStore;
    
    constructor(apiStore: APIStore) {
        makeAutoObservable(this);
        this.apiStore = apiStore;
    }

    pushWhitePage(whitePage: IGeneratedWhitePage): void {
        this.whitePages.push(whitePage);
    }

    clearWhitePages(): void {
        this.whitePages = [];
    }

    async getAll(): Promise<void> {
        try {
            this.apiStore.startRequest();
            const response = await GeneratedWhitePageService.getAll();

            this.clearWhitePages();
            response.data.tasks.forEach((whitePage) => this.pushWhitePage(whitePage));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async create(id: number, prompt: string): Promise<void> {
        try {
            this.apiStore.startRequest();

            await GeneratedWhitePageService.create(id, prompt);

            this.apiStore.endRequest("Ваш запрос генерации успешно поставлен в очередь");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }
}