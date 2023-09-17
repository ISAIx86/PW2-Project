const config= require('../config')
const mongoose = require('mongoose')
const Regex = require('../handlers/regex')
const uploader = require('../middlewares/uploader')
const fs = require('fs')
const date = require('date-and-time')

const user_schema = new mongoose.Schema({
    nombres: {
        type: String,
        validate: {
            validator: v => Regex.names.test(v),
            message: 'El nombre tiene formato no válido.'
        },
        required: 'El nombre es requerido.'
    },
    apellidos: {
        type: String,
        validate: {
            validator: v => Regex.names.test(v),
            message: 'El apellido tiene formato no válido.'
        },
        required: 'El apellido es requerido.'
    },
    username: {
        type: String,
        validate: [
            {
                validator: v => Regex.usernames.test(v),
                message: 'El nombre de usuario tiene formato no válido.'
            },
            {
                validator: async function (v) {
                    const result = await this.constructor.findOne({_id: {$ne: this.id}, username: v})
                    return !result
                },
                message: 'Este nombre de usuario ya fué tomado.'
            }
        ],
        required: 'El nombre de usuario es requerido.'
    },
    image: {
        type: String
    },
    descrip: {
        type: String
    },
    is_private: {
        type: Boolean,
        default: false
    },
    fecha_nac: {
        type: Date,
        required: 'La fecha de nacimiento es requerida.'
    },
    email: {
        type: String,
        validate: [
            {
                validator: v => Regex.emails.test(v),
                message: 'El correo electrónico tiene formato no válido.'
            },
            {
                validator: async function (v) {
                    const result = await this.constructor.findOne({_id: {$ne: this.id}, email: v})
                    return !result
                },
                message: 'Ya existe un usuario con este correo.'
            }
        ],
        required: 'El correo es requierido.'
    },
    password: {
        type: String,
        required: 'La contraseña es requerida.'
    },
    is_mod: {
        type: Boolean,
        default: false
    },
    following_games: {
        type: [mongoose.Types.ObjectId],
        ref: 'juegos'
    },
    followed: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    following: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    requests: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

user_schema.methods.uploadImage = async function uploadImage(img_file) {

    const filename = `${this.id}_${date.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}`

    const path = await uploader.uploadInDestiny(
        `./${config.directories.user_images}`,
        img_file,
        filename
    )

    if (fs.existsSync(path.final_path))
        this.setImage(path.new_filename)
    else this.invalidate('image', 'Ocurrio un error para subir la imagen')

}

user_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

module.exports = mongoose.model('usuarios', user_schema)