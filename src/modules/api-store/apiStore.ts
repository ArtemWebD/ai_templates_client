import { AlertType } from "../../store/alert/alertInterface";
import AlertStore from "../../store/alert/alertStore";
import LoaderStore from "../../store/loader/loaderStore";

/**
 * Parent class for services that use API
 */
export default class APIStore {
    private alertStore: AlertStore;
    private loaderStore: LoaderStore;

    constructor(alertStore: AlertStore, loaderStore: LoaderStore) {
        this.alertStore = alertStore;
        this.loaderStore = loaderStore;
    }

    /**
     * Use it in before creating API request
     */
    startRequest(): void {
        this.loaderStore.load();
    }

    /**
     * Use it in after creating API request
     */
    endRequest(message?: string): void {
        this.loaderStore.unload();

        if (message) {
            this.showSuccessMessage(message);
        }
    }

    /**
     * Use it in catch block
     * @param error catch error param
     */
    handleError(error: any): void {
        this.loaderStore.unload();

        const message = error.response?.data?.message;
            
        if (message) {
            this.showErrorMessage(message);
        }
    }

    showSuccessMessage(message: string): void {
        this.alertStore.show(message, AlertType.success);
    }

    showErrorMessage(message: string): void {
        this.alertStore.show(message, AlertType.danger);
    }
}