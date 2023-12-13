require('dotenv').config()
const config = require('./config')
const { logger } = require('./middlewares/logger')

const appConfig = config.appConfig

// Conexión con MongoDB
const MongooseManager = require('./handlers/mongooseManager')

MongooseManager.test()

// Traer modelos
require('./models/User')
require('./models/Article')
require('./models/Review')
require('./models/Post')
require('./models/Multimedia')
require('./models/Report')

require('./models/Game')
require('./models/Classification')
require('./models/Developer')
require('./models/Genre')
require('./models/Platform')

// Levantar la API
const app = require('./app')

app.listen(appConfig.port, () => {
    logger.log('info', `Servidor corriendo y escuchando el puerto ${appConfig.port}`)
})