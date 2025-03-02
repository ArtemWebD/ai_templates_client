import { makeAutoObservable } from "mobx";
import UserService from "../../services/user/userService";
import AlertStore from "../alert/alertStore";
import { AlertType } from "../alert/alertInterface";
import { IUser } from "../../services/user/userInterfaces";

export default class AuthStore {
    isAuth = false;
    isAdmin = false;

    users: IUser[] = [];

    private alertStore: AlertStore;

    constructor(alertStore: AlertStore) {
        makeAutoObservable(this);
        this.alertStore = alertStore;
    }

    setAuth(isAuth: boolean): void {
        this.isAuth = isAuth;
    }

    setAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }

    pushUser(user: IUser): void {
        this.users.push(user);
    }

    async login(email: string, password: string): Promise<void> {
        try {
            const response = await UserService.login(email, password);

            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async register(email: string, name: string, password: string): Promise<void> {
        try {
            const response = await UserService.register(email, name, password);

            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);

            this.alertStore.show("Регистрация прошла успешно", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async refresh(): Promise<void> {
        try {
            const response = await UserService.refresh();

            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
        } catch (error: any) {
            this.setAuth(false);
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async checkAdmin(): Promise<void> {
        try {
            const response = await UserService.checkAdmin();

            this.setAdmin(response.data.isAdmin);
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async getAll(): Promise<void> {
        try {
            const response = await UserService.getAll();

            response.data.users.forEach((user) => this.pushUser(user));
        } catch (error: any) {
            const message = error.response?.data?.message;

            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }
}