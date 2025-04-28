export interface IUser {
    _id: string;
    role: string;
    iat?: number;
    exp?: number;
}

export interface ICreateUser {
    name?: string;
    avatarId?: string;
    username: string;
    phone?: string;
    email?: string;
    address?: string;
    password?: string;
}

export interface ISearchUser {
    name?: string;
    status?: string;
}

export interface IEmployee {
    _id: string;
    name?: string;
    avatarId?: string;
    username: string;
    phone?: string;
    email?: string;
    address?: string;
    avatar?: string;
}