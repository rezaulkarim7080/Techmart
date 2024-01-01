import ErrorHandler from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400); // Set status code here
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400); // Set status code here
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Invalid token`;
        err = new ErrorHandler(message, 400); // Set status code here
    }

    if (err.name === "TokenExpiredError") {
        const message = `Token has expired`;
        err = new ErrorHandler(message, 400); // Set status code here
    }

    return next(err); // Re-throw the modified error
};
