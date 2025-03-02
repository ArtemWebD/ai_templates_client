export interface IGenerateToken {
    id: number;
    token: string;
    createdAt: string;
    count: number;
}

export interface IGenerateTokensResponse {
    generateTokens: IGenerateToken[];
}

export interface IGenerateTokenResponse {
    generateToken: IGenerateToken;
}