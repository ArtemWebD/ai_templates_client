export interface ITemplatesResponse {
    templates: ITemplate[];
}

export interface ITemplateResponse {
    template: ITemplate;
}

export interface ITemplate {
    id: number;
    title: string;
    path: string;
    pages: string[];
}