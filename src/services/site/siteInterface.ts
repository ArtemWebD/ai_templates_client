export interface ISite {
    id: number;
    title: string;
    path: string;
    pages: string[];
}

export interface ISitesResponse {
    sites: ISite[];
}

export interface ISiteResponse {
    site: ISite;
}