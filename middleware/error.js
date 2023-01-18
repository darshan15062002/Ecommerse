const Errorhander = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'internal server error'

    // wrong mongodb id error
    if (err.name == 'CastError') {
        const message = `resource not found, ${err.path}`
        err = new Errorhander(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        status: err.statusCode
    })
}