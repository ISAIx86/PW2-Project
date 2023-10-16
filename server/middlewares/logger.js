const {
    createLogger,
    transports,
    format
} = require('winston')
const config = require('../config')

const timezoned = () => {
    return new Date().toLocaleString('en-US', {timeZone: config.appConfig.timezone})
}

exports.logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp({format: timezoned}), format.simple())
        }),
        new transports.File({
            filename: './logfiles/errors.log',
            level: 'error',
            format: format.combine(format.timestamp({format: timezoned}), format.simple())
        })
    ]
})

exports.modlogger = createLogger({
    transports: [
        new transports.File({
            filename: './logfiles/mods_audit.log',
            level: 'create',
            format: format.combine(format.timestamp({format: timezoned}), format.simple())
        }),
        new transports.File({
            filename: './logfiles/mod_audit.log',
            level: 'delete',
            format: format.combine(format.timestamp({format: timezoned}), format.simple())
        }),
        new transports.File({
            filename: './logfiles/mod_audit.log',
            level: 'handle',
            format: format.combine(format.timestamp({format: timezoned}), format.simple())
        })
    ]
})