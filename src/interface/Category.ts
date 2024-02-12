export interface Category {
    _id?: string;
    categoryname?: string;
    createdAt?: Date,
    updatedAt?: Date,
    __v?: string;
}

export interface Houses {
    _id?: string;
    // categoryId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoryDetail?: any;
    housename?: string;
    description?: string;
    price?: number;
    aggreementDate?: Date,
    deposit?: number;
    status?: string;
    remarks?: string;
    createdAt?: Date,
    updatedAt?: Date,
    __v?: string;
}

export interface TenantClass {
    _id?: string;
    housename?: string;
    description?: string;
    price?: number;
    aggreementDate?: Date,
    deposit?: number;
    status?: string;
    remarks?: string;
    createdAt?: Date,
    updatedAt?: Date,
    __v?: string;
}

