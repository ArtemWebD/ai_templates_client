import { makeAutoObservable } from "mobx";
import { ITemplate } from "../../services/template/templateInterface";
import TemplateService from "../../services/template/templateService";
import APIStore from "../../modules/api-store/apiStore";

export default class TemplateStore {
    templates: ITemplate[] = [];

    private apiStore: APIStore;
    
    constructor(apiStore: APIStore) {
        makeAutoObservable(this);
        this.apiStore = apiStore;
    }

    pushTemplate(template: ITemplate): void {
        this.templates.push(template);
    }

    removeTemplate(id: number): void {
        this.templates = this.templates.filter((el) => el.id !== id);
    }

    async getAll(): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await TemplateService.getAll();

            response.data.templates.forEach((template) => this.pushTemplate(template));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async create(data: FormData): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await TemplateService.create(data);

            this.pushTemplate(response.data.template);

            this.apiStore.endRequest("Шаблон успешно загружен в список");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            await TemplateService.remove(id);

            this.removeTemplate(id);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }
}