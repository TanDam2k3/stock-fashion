export interface ProductPayload {
    housewareId?: string;
    name?: string;
    type?: string;
    quantity?: number;
    price?: number;
    fileId?: string;
    status?: string;
    createdAt?: Date;
}

export interface ProductSearchPayload {
    name?: string;
    type?: string;
    status?: string;
    createdAt?: Date;
}

export interface ICreateProduct {
    _id?: string;
    housewareId?: string;
    housewareName?: string;
    fileId?: string;
    name?: string;
    type?: string;
    quantity?: number;
    status?: string,
    price?: number;
    imageUrl?: string;
    file?: File | null,
    imagePreview?: string | null;
    updatedAt?: Date;
    createdAt?: Date;
    identification?: string;
}

export interface Product {
    _id?: string;
    housewareId?: string;
    fileId?: string;
    name?: string;
    type?: string;
    quantity?: number;
    status?: string,
    price?: number;
    imageUrl?: string;
    updatedAt?: Date;
    createdAt?: Date;
}