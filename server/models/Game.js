const config = require('../config')
const mongoose = require('mongoose')
const uploader = require('../middlewares/uploader')
const fs = require('fs')
const Regex = require('../handlers/regex')
const errorMessages = require('../handlers/error-messages.json')

const game_schema = new mongoose.Schema({
    name_id: {
        type: String,
        validate: [
            {
                validator: async function (v) {
                    const result = await this.constructor.findOne({_id: {$ne: this.id}, name_id: v})
                    return !result
                },
                message: errorMessages.games['taken-nameid']
            },
            {
                validator: v => Regex.game_nid.test(v),
                message: errorMessages.games['bad-nameid']
            }
        ],
        required: errorMessages.games['required-nameid']
    },
    title: {
        type: String,
        required: errorMessages.games['required-title']
    },
    descrip: {
        type: String,
        required: errorMessages.games['required-desc']
    },
    image: {
        type: String,
        required: errorMessages.games['required-image']
    },
    cover: {
        type: String,
        required: errorMessages.games['required-cover']
    },
    rating: {
        type: Number,
        default: 0.0
    },
    classification: {
        type: mongoose.Types.ObjectId,
        required: errorMessages.games['required-class'],
        ref: 'clasificaciones'
    },
    genre: {
        type: [mongoose.Types.ObjectId],
        validate: {
            validator: v => Array.isArray(v) & v.length > 0,
            message: errorMessages.games['required-genre']
        },
        ref: 'generos',
        required: errorMessages.games['required-genre']
    },
    developers: {
        type: [mongoose.Types.ObjectId],
        validate: {
            validator: v => Array.isArray(v) & v.length > 0,
            message: errorMessages.games['required-dev']
        },
        ref: 'desarrolladores',
        required: errorMessages.games['required-dev']
    },
    platforms: {
        type: [mongoose.Types.ObjectId],
        validate: {
            validator: v => Array.isArray(v) & v.length > 0,
            message: errorMessages.games['required-plat']
        },
        ref: 'plataformas',
        required: errorMessages.games['required-plat']
    },
    followers: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    release_date: {
        type: Date,
        required: errorMessages.games['required-dor']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: errorMessages.games['required-author']
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

game_schema.methods.uploadImage = async function uploadImage (type, img_file) {

    if (type === 'title') {

        const path = await uploader.uploadInDestiny(
            `./${config.directories.game_images}`,
            img_file,
            this.id
        )

        if (fs.existsSync(path.final_path))
            this.setImage(path.new_filename)

    } else if (type === 'cover') {

        const path = await uploader.uploadInDestiny(
            `./${config.directories.game_covers}`,
            img_file,
            this.id
        )

        if (fs.existsSync(path.final_path))
            this.setCover(path.new_filename)

    }
        
}

game_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

game_schema.methods.setCover = function setCover (filename) {
    this.cover = filename
}

game_schema.methods.setRating = function setRating (value) {
    this.rating = value
}

module.exports = mongoose.model('juegos', game_schema)