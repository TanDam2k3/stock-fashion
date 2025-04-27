export interface Houseware {
    _id: string;
    name: string;
    city: string;
    address: string;
    status: string;
    userId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface HousewarePayload {
    userId?: string;
    name?: string;
    city?: string;
    address?: string;
    status?: string;
}