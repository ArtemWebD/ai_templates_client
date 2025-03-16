import { makeAutoObservable } from "mobx";
import { ISite } from "../../services/site/siteInterface";
import SiteService from "../../services/site/siteService";
import APIStore from "../../modules/api-store/apiStore";

export default class SiteStore {
    sites: ISite[] = [];

    private apiStore: APIStore;
    
    constructor(apiStore: APIStore) {
        makeAutoObservable(this);
        this.apiStore = apiStore;
    }

    pushSite(site: ISite): void {
        this.sites.push(site);
    }

    removeSite(id: number): void {
        this.sites = this.sites.filter((site) => site.id !== id);
    }

    async getAll(): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await SiteService.getAll();

            response.data.sites.forEach((site) => this.pushSite(site));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async create(title: string, templateId: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await SiteService.create(title, templateId);

            this.pushSite(response.data.site);
            
            this.apiStore.endRequest("Сайт успешно создан");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            await SiteService.remove(id);
            this.removeSite(id);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }
}