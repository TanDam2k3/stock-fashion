export interface IUser {
    _id: string;
    role: string;
    username?: string;
    name?: string;
    phone?: string;
    avatarId?: string;
    email?: string;
    address?: string;
    avatar?: string;
    password?: string;
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

export interface IUserUpdate {
    _id?: string;
    username?: string;
    name?: string;
    password?: string;
    email?: string;
    phone?: string;
    address?: string;
    avatarId?: string;
}