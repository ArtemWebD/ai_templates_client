export interface IAuthResponse {
    accessToken: string;
}

export interface IAdminValidation {
    isAdmin: boolean;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    type: UserType
}

export enum UserType {
    admin = "super",
    default = "user"
}

export interface IUsersResponse {
    users: IUser[];
}