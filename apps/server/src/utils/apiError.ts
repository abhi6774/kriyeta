class ApiError extends Error {
    statusCode : number;
    message: string;
    success: boolean;
    constructor(statusCode:number, message:string) {
        super(message)
        this.statusCode = statusCode;
        this.message = message
        this.success = false
    }
}

export default ApiError