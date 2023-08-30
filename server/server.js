require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.on('error', (err) => {
    console.log("Error de conexión con Mongoosse: " + err.message)
})

mongoose.connection.once('open', () => {
    console.log("Conectado con MongoDB!")
})

// Traer modelos
require('./models/User')

const app = require('./app')

app.listen(5000, () => {
    console.log("Servidor activo y escuchando el puerto 5000")
})