const { logger } = require('../middlewares/logger')

exports.catchErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            if (typeof err === "string") {
                res.status(400).json({
                    state: 'failed',
                    content: err
                })
            } else {
                next(err)
            }
        })
    }
}

exports.mongooseErrors = (err, req, res, next) => {
    if (!err.errors) return next(err)
    const errorKeys = Object.keys(err.errors)
    let message = ""
    errorKeys.forEach((key) => (message += err.errors[key].message + ", "))
    message = message.substr(0, message.length - 2),
    logger.log('error',message)
    res.status(400).json({
        status: 'error',
        content: message
    })
}

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || ""
    const errorDetails = {
        status: 'error',
        content: {
            message: err.message,
            status: err.status,
            stack: err.stack
        }
    }
    logger.log('error', JSON.stringify(errorDetails.content))
    res.status(err.status || 500).json(errorDetails)
}

exports.productionErrors = (err, req, res, next) => {
    const errorDetails = {
        status: 'error',
        content: {
            message: err.message,
            status: err.status,
            stack: err.stack
        }
    }
    logger.log('error', JSON.stringify(errorDetails.content))
    res.status(err.status || 500).json({errorDetails})
}

exports.notFound = (req, res, next) => {
    res.status(404).json({
        status: "error",
        content: "Ruta no encontrada."
    })
}