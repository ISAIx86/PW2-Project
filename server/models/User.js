const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    nombres: {type: String, required: 'El Nombre es requerido.'},
    apellidos: {type: String, required: 'El Apellido es requerido.'},
    username: {type: String, required: 'El Nombre de usuario es requerido.', unique: true},
    image: {type: String},
    descrip: {type: String},
    is_private: {type: Boolean, default: false},
    fecha_nac: {type: Date, required: 'La fecha de nacimiento es requerida.'},
    email: {type: String, required: 'El correo es requierido.', unique: true},
    password: {type: String, required: 'La contraseña es requerida.'},
    is_mod: {type: Boolean, default: false},
    following_games: [{type: mongoose.Types.ObjectId, ref: 'juegos'}],
    followed: [{type: mongoose.Types.ObjectId, ref: 'usuarios'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'usuarios'}],
    is_deleted: {type: Boolean, default: false}
}, {
    timestamps: true
}
)

user_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

module.exports = mongoose.model('usuarios', user_schema)