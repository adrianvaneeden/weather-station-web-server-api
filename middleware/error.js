import colors from 'colors';
import ErrorResponse from './utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    console.log(err);

    let error = { ...err };
    error.message = err.message;

    console.log(error);

    // Mongoose bad ObjectID
    if (err.name === 'CastError') {
        const message = `Weather record not found with ID ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose valudation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        // error: 'Server Error'
        error: error.message || 'Server Error'
    })
}

export default errorHandler;
