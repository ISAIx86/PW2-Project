const config = require('./config')
const express = require('express')
const app = express()

// Configuración de la API
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(require('cors')())
app.use(require('express-fileupload')())

// Rutas estáticas
app.use('/public/img_users', express.static(`${__dirname}/${config.directories.user_images}`))
app.use('/public/game_title', express.static(`${__dirname}/${config.directories.game_images}`))
app.use('/public/game_cover', express.static(`${__dirname}/${config.directories.game_covers}`))
app.use('/public/esrb', express.static(`${__dirname}/${config.directories.esrb_logos}`))

// Traer las rutas en este apratado
app.use('/user', require('./routes/user_routes'))
app.use('/classification', require('./routes/classification_routes'))
app.use('/developer', require('./routes/developer_routes'))
app.use('/genre', require('./routes/genre_routes'))
app.use('/platform', require('./routes/platform_routes'))
app.use('/games', require('./routes/game_routes'))
app.use('/review', require('./routes/review_routes'))
app.use('/post', require('./routes/post_routes'))
app.use('/article', require('./routes/article_routes'))

// Configurar Handlers de errores en este apartado
const errorHandlers = require('./handlers/errorHandler')
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors)
if (process.env.ENV === "DEVELOPMENT")
    app.use(errorHandlers.developmentErrors)
else
    app.use(errorHandlers.productionErrors)

module.exports = app