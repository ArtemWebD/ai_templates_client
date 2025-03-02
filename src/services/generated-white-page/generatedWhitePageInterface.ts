export interface IGeneratedWhitePage {
    id: number;
    status: GeneratedWhitePageStatus;
    whitePageId: number;
    title: string;
    whitePageTitle: string;
}

export enum GeneratedWhitePageStatus {
    waiting = "В очереди",
    active = "Выполняется",
    completed = "Готово",
    error = "Ошибка"
}

export interface IGeneratedWhitePagesResponse {
    tasks: IGeneratedWhitePage[];
}