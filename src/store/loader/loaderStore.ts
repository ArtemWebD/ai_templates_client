import { makeAutoObservable } from "mobx";

export default class LoaderStore {
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    load(): void {
        this.setLoading(true);
    }

    unload(): void {
        this.setLoading(false);
    }
}