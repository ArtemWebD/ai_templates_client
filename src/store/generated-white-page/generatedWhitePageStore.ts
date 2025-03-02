import { makeAutoObservable } from "mobx";
import AlertStore from "../alert/alertStore";
import { IGeneratedWhitePage } from "../../services/generated-white-page/generatedWhitePageInterface";
import { AlertType } from "../alert/alertInterface";
import GeneratedWhitePageService from "../../services/generated-white-page/generatedWhitePage";

export default class GeneratedWhitePageStore {
    alertStore: AlertStore;

    whitePages: IGeneratedWhitePage[] = [];

    constructor(alertStore: AlertStore) {
        makeAutoObservable(this);
        this.alertStore = alertStore;
    }

    pushWhitePage(whitePage: IGeneratedWhitePage): void {
        this.whitePages.push(whitePage);
    }

    clearWhitePages(): void {
        this.whitePages = [];
    }

    async getAll(): Promise<void> {
        try {
            const response = await GeneratedWhitePageService.getAll();

            this.clearWhitePages();
            response.data.tasks.forEach((whitePage) => this.pushWhitePage(whitePage));
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async create(id: number, prompt: string): Promise<void> {
        try {
            await GeneratedWhitePageService.create(id, prompt);
            this.alertStore.show("Ваш запрос генерации успешно поставлен в очередь", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }
}