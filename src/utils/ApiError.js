class apiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        statack = ""
    ) {
        super(message);     
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.message = message;
        this.errors = error;

        if (statack) {
            this.stack = statack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default apiError;