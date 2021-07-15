import colors from 'colors';
import ErrorResponse from './utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Log to console for dev
    // console.log(err.stack.red);
    // console.log(err);

    // Mongoose bad ObjectID
    if (err.name === 'CastError') {
        const message = `Weather record not found with ID ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const messate = 'Duplicate field value entered';
        error = new ErrorResponse(message, 4000);
    }

    // Mongoose valudation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

export default errorHandler;
