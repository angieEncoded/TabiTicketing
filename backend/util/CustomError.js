class CustomError extends Error {
    constructor(message, status, module, page) {
        super();
        this.message = message;
        this.status = status;
        this.module = module;
        this.page = page;
    }
}

module.exports = CustomError;
