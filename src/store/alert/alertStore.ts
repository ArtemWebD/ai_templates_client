import { makeAutoObservable } from "mobx";
import { AlertType } from "./alertInterface";

export default class AlertStore {
    isShow = false;
    message = "";
    type = AlertType.success;

    constructor() {
        makeAutoObservable(this);
    }

    setShow(isShow: boolean): void {
        this.isShow = isShow;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    setType(type: AlertType): void {
        this.type = type;
    }

    show(message: string, type: AlertType): void {
        this.setShow(true);
        this.setMessage(message);
        this.setType(type);

        setTimeout(() => this.hide(), 6000);
    }

    hide(): void {
        this.setShow(false);
    }
}