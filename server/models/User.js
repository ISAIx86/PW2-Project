const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    nombres: {type: String, required: 'El Nombre es requerido.'},
    apellidos: {type: String, required: 'El Apellido es requerido.'},
    username: {type: String, required: 'El Nombre de usuario es requerido.'},
    image: {type: String},
    descrip: {type: String},
    fecha_nac: {type: Date, required: 'La fecha de nacimiento es requerida.'},
    email: {type: String, required: 'El correo es requierido.'},
    password: {type: String, required: 'La contraseña es requerida.'},
    is_mod: {type: Boolean, default: false},
    following_games: {type: Array},
    followed: {type: Array},
    following: {type: Array}
}, {
    timestamps: true
}
)

user_schema.methods.setImage = function setImage (filename) {
    this.image = `/public/img_users/${filename}`
}

module.exports = mongoose.model('Usuarios', user_schema)