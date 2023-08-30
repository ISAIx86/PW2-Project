const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    nombres: {type: String, required: 'El Nombre es requerido.'},
    apellidos: {type: String, required: 'El Apellido es requerido.'},
    username: {type: String, required: 'El Nombre de usuario es requerido.'},
    descrip: {type: String},
    fecha_nac: {type: Date, required: 'La fecha de nacimiento es requerida.'},
    email: {type: String, required: 'El correo es requierido.'},
    password: {type: String, required: 'La contraseña es requerida.'},
    following_games: {type: Array},
    followed: {type: Array},
    following: {type: Array}
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Usuarios', user_schema)