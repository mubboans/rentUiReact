export interface SuccesResponse {
    message?: string,
    status?: string,
    data?: object,
    success?: boolean,
}

export interface ErrorResponse {
    message?: string,
    status?: string,
    error?: object,
    success?: boolean,
}