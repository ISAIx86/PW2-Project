const config= require('../config')
const mongoose = require('mongoose')
const Regex = require('../handlers/regex')
const uploader = require('../middlewares/uploader')
const fs = require('fs')
const date = require('date-and-time')
const errorMessages = require('../handlers/error-messages.json')

const user_schema = new mongoose.Schema({
    nombres: {
        type: String,
        validate: {
            validator: v => Regex.names.test(v),
            message: errorMessages.users['bad-name']
        },
        required: errorMessages.users['required-name']
    },
    apellidos: {
        type: String,
        validate: {
            validator: v => Regex.names.test(v),
            message: errorMessages.users['bad-last']
        },
        required: errorMessages.users['required-last']
    },
    username: {
        type: String,
        validate: [
            {
                validator: v => Regex.usernames.test(v),
                message: errorMessages.users['bad-username']
            },
            {
                validator: async function (v) {
                    const result = await this.constructor.findOne({_id: {$ne: this.id}, username: v})
                    return !result
                },
                message: errorMessages.users['taken-username']
            }
        ],
        required: errorMessages.users['required-username']
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
        required: errorMessages.users['required-dob']
    },
    email: {
        type: String,
        validate: [
            {
                validator: v => Regex.emails.test(v),
                message: errorMessages.users['bad-email']
            },
            {
                validator: async function (v) {
                    const result = await this.constructor.findOne({_id: {$ne: this.id}, email: v})
                    return !result
                },
                message: errorMessages.users['taken-email']
            }
        ],
        required: errorMessages.users['required-email']
    },
    password: {
        type: String,
        required: errorMessages.users['required-password']
    },
    is_mod: {
        type: Boolean,
        default: false
    },
    following_games: {
        type: [mongoose.Types.ObjectId],
        ref: 'juegos'
    },
    followers: {
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
    else this.invalidate('image', errorMessages.users['image-upload'])

}

user_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

module.exports = mongoose.model('usuarios', user_schema)