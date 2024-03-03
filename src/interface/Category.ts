/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface Tenant {
    _id?: string;
    userDetail?: any;
    houseDetail?: any;
    ouststanding_balance?: string;
    createdBy?: string;
    otherdetail?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Payments {
    _id?: string;
    tenantdetail?: any;
    housedetail?: any;
    amount?: number;
    maintainance?: number;
    maintainanceremark?: string;
    electricbill?: string;
    electricbillremark?: string;
    createdBy?: string;
    otherdetail?: string;
    mode?: string;
    type?: string;
    collectedOn?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
