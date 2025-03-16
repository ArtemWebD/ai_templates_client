import { makeAutoObservable } from "mobx";
import { IGenerateToken } from "../../services/generate-token/generateTokenInterface";
import GenerateTokenService from "../../services/generate-token/generateToken";
import APIStore from "../../modules/api-store/apiStore";

export default class GenerateTokenStore {
    tokens: IGenerateToken[] = [];
    userTokens: IGenerateToken[] = [];

    private apiStore: APIStore;
    
    constructor(apiStore: APIStore) {
        makeAutoObservable(this);
        this.apiStore = apiStore;
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
            this.apiStore.startRequest();
            
            const response = await GenerateTokenService.getAll();

            response.data.generateTokens.forEach((token) => this.pushToken(token));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async getAllByUser(userId: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await GenerateTokenService.getAllByUser(userId);

            this.clearUserTokens();
            response.data.generateTokens.forEach((token) => this.pushUserToken(token));

            this.apiStore.endRequest();
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async create(userId: number, count: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await GenerateTokenService.create(userId, count);

            this.pushUserToken(response.data.generateToken);

            this.apiStore.endRequest("Токен успешно создан");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }

    async increaseCount(id: number, token: string, count: number): Promise<void> {
        try {
            this.apiStore.startRequest();

            const response = await GenerateTokenService.increaseCount(token, count);

            this.updateToken(id, response.data.generateToken);

            this.apiStore.endRequest("Количество использований токена увеличено");
        } catch (error: any) {
            this.apiStore.handleError(error);
        }
    }
}