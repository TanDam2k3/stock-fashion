export interface ITransaction {
    _id: string;
    housewareId?: string;
    productId?: string;
    userId?: string;
    type?: string;
    quantity?: number;
    price?: number;
    status?: string;
    imageUrl?: string;
    housewareName?: string;
    productName?: string;
    userName?: string;
    updatedAt?: Date;
    createdAt?: Date;
}


export interface ISearchTransaction {
    userId?: string;
    type?: string;
    status?: string;
}
