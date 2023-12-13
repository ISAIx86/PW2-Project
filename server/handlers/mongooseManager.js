const mongoose = require('mongoose')
const { logger } = require('../middlewares/logger')
const config = require('../config')

class MongooseManager {

    static async connect() {

        let result = true

        await mongoose.connect(config.dbConfig.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .catch(error => {
            logger.logger('error', error)
            result = false
        })

        return result

    }

    static disconnect() {

        mongoose.disconnect()

    }

    static test() {

        mongoose.connect(config.dbConfig.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        .then(() => {
            logger.log('info', `¡Conectado con MongoDB!`)
        })
        .catch(error => {
            logger.log('info', `No se pudo conectar con MongoDB`)
            logger.log('error', error)
        })
        .finally(() => {
            mongoose.disconnect()
        })

    }

}

module.exports = MongooseManager