export interface IUser {
    _id: string;
    role: string;
    iat?: number;
    exp?: number;
}