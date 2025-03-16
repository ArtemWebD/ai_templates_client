import { makeAutoObservable } from "mobx";
import UserService from "../../services/user/userService";
import { IUser } from "../../services/user/userInterfaces";
import APIStore from "../../modules/api-store/apiStore";

export default class AuthStore {
    isAuth = false;
    isAdmin = false;

    users: IUser[] = [];

    private apiStore: APIStore;

    constructor(apiStore: APIStore) {
        makeAutoObservable(this);
        this.apiStore = apiStore;
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
            this.apiStore.startRequest();

            const response = await UserService.login(email, password);

            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async register(email: string, name: string, password: string): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await UserService.register(email, name, password);

            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);

            this.apiStore.endRequest("Регистрация прошла успешно");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async refresh(): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await UserService.refresh();

            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.setAuth(false);
            this.apiStore.handleError(error);
        }
    }

    async checkAdmin(): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await UserService.checkAdmin();

            this.setAdmin(response.data.isAdmin);

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async getAll(): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await UserService.getAll();

            response.data.users.forEach((user) => this.pushUser(user));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }
}