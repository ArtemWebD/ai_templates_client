export interface IWhitePage {
    id: number;
    title: string;
    path: string;
}

export interface IWhitePagesResponse {
    whitePages: IWhitePage[];
}

export interface IWhitePageResponse {
    whitePage: IWhitePage;
}

export interface IWhitePageJSONResponse {
    json: string;
}