import { makeAutoObservable } from "mobx";
import AlertStore from "../alert/alertStore";
import { IGenerateToken } from "../../services/generate-token/generateTokenInterface";
import { AlertType } from "../alert/alertInterface";
import GenerateTokenService from "../../services/generate-token/generateToken";

export default class GenerateTokenStore {
    private alertStore: AlertStore;

    tokens: IGenerateToken[] = [];
    userTokens: IGenerateToken[] = [];

    constructor(alertStore: AlertStore) {
        makeAutoObservable(this);
        
        this.alertStore = alertStore;
    }

    pushToken(token: IGenerateToken): void {
        this.tokens.push(token);
    }

    pushUserToken(token: IGenerateToken): void {
        this.userTokens.push(token);
    }

    updateToken(id: number, token: IGenerateToken): void {
        for (let i = 0; i < this.userTokens.length; i++) {
            if (this.userTokens[i].id === id) {
                this.userTokens[i] = token;

                return;
            }
        }
    }

    clearUserTokens(): void {
        this.userTokens = [];
    }

    async getAll(): Promise<void> {
        try {
            const response = await GenerateTokenService.getAll();

            response.data.generateTokens.forEach((token) => this.pushToken(token));
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async getAllByUser(userId: number): Promise<void> {
        try {
            const response = await GenerateTokenService.getAllByUser(userId);

            this.clearUserTokens();
            response.data.generateTokens.forEach((token) => this.pushUserToken(token));
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async create(userId: number, count: number): Promise<void> {
        try {
            const response = await GenerateTokenService.create(userId, count);

            this.pushUserToken(response.data.generateToken);
            this.alertStore.show("Токен успешно создан", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }

    async increaseCount(id: number, token: string, count: number): Promise<void> {
        try {
            const response = await GenerateTokenService.increaseCount(token, count);

            this.updateToken(id, response.data.generateToken);
            this.alertStore.show("Количество использований токена увеличено", AlertType.success);
        } catch (error: any) {
            const message = error.response?.data?.message;
            
            if (message) {
                this.alertStore.show(message, AlertType.danger);
            }
        }
    }
}