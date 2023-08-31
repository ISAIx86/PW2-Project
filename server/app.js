const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(require('cors')())
app.use(require('express-fileupload')())

app.use('/public/img_users', express.static(`${__dirname}/storage/users_images`))

// Traer las rutas en este apratado
app.use('/user', require('./routes/user_routes'))

// Configurar Handlers de errores en este apartado
const errorHandlers = require('./handlers/errorHandler')
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors)
if (process.env.ENV === "DEVELOPMENT")
    app.use(errorHandlers.developmentErrors)
else
    app.use(errorHandlers.productionErrors)

module.exports = app