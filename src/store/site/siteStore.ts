import { makeAutoObservable } from "mobx";
import { ISite } from "../../services/site/siteInterface";
import AlertStore from "../alert/alertStore";
import SiteService from "../../services/site/siteService";
import { AlertType } from "../alert/alertInterface";

export default class SiteStore {
    sites: ISite[] = [];

    alertStore: AlertStore;

    constructor(alertStore: AlertStore) {
        makeAutoObservable(this);
        this.alertStore = alertStore;
    }

    pushSite(site: ISite): void {
        this.sites.push(site);
    }

    removeSite(id: number): void {
        this.sites = this.sites.filter((site) => site.id !== id);
    }

    async getAll(): Promise<void> {
        try {
            const response = await SiteService.getAll();

            response.data.sites.forEach((site) => this.pushSite(site));
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async create(title: string, templateId: number): Promise<void> {
        try {
            const response = await SiteService.create(title, templateId);

            this.pushSite(response.data.site);
            this.alertStore.show("Сайт успешно создан", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await SiteService.remove(id);
            this.removeSite(id);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }
}