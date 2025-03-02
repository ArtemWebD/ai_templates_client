import { makeAutoObservable } from "mobx";
import AlertStore from "../alert/alertStore";
import { IWhitePage } from "../../services/white-page/whitePageInterface";
import { AlertType } from "../alert/alertInterface";
import WhitePageService from "../../services/white-page/whitePageService";

export default class WhitePageStore {
    alertStore: AlertStore;

    whitePages: IWhitePage[] = [];
    json: string = "";

    constructor(alertStore: AlertStore) {
        makeAutoObservable(this);

        this.alertStore = alertStore;
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
            const response = await WhitePageService.upload(data);

            this.pushWhitePage(response.data.whitePage);
            this.alertStore.show("Шаблон успешно добавлен", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async getAll(): Promise<void> {
        try {
            const response = await WhitePageService.getAll();

            this.clearWhitePage();
            response.data.whitePages.forEach((whitePage) => this.pushWhitePage(whitePage));
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await WhitePageService.remove(id);

            this.removeWhitePage(id);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async getJson(id: number | string): Promise<void> {
        try {
            const response = await WhitePageService.getJson(id);

            this.setJson(response.data.json);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async updateJson(id: number, json: string): Promise<void> {
        try {
            await WhitePageService.updateJson(id, json);

            this.setJson(json);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }
}