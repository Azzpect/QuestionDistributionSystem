class clientError extends Error{
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
class serverError extends Error {
    constructor(message) {
        super(message);
        this.code = 500;
    }
}




module.exports = { clientError, serverError }