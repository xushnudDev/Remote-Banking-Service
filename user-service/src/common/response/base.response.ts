export class ErrorField {
    name: string;
    message: string;
};

export class ErrorResponse {
    code: number;
    message: string;
    cause: string;
    fields?: ErrorField[];
};

export class BaseResponse<T = any> {
    success: boolean;
    data: T | null;
    error?: ErrorResponse | null;
}