import { makeAutoObservable } from "mobx";
import { ITemplate } from "../../services/template/templateInterface";
import AlertStore from "../alert/alertStore";
import TemplateService from "../../services/template/templateService";
import { AlertType } from "../alert/alertInterface";

export default class TemplateStore {
    templates: ITemplate[] = [];
    alertStore: AlertStore;

    constructor(alertStore: AlertStore) {
        makeAutoObservable(this);
        this.alertStore = alertStore;
    }

    pushTemplate(template: ITemplate): void {
        this.templates.push(template);
    }

    removeTemplate(id: number): void {
        this.templates = this.templates.filter((el) => el.id !== id);
    }

    async getAll(): Promise<void> {
        try {
            const response = await TemplateService.getAll();

            response.data.templates.forEach((template) => this.pushTemplate(template));
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async create(data: FormData): Promise<void> {
        try {
            const response = await TemplateService.create(data);

            this.pushTemplate(response.data.template);
            this.alertStore.show("Шаблон успешно загружен в список", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await TemplateService.remove(id);

            this.removeTemplate(id);
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }
}