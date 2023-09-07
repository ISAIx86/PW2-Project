const mongoose = require('mongoose')

const game_schema = new mongoose.Schema({
    name_id: {
        type: String,
        required: 'Se requiere un nombre único.',
        unique: 'Ya existe un juego con este nombre único.'
    },
    titulo: {
        type: String,
        required: 'Se requiere el título.'
    },
    descrip: {
        type: String,
        required: 'Se requiere una descripción del juego.'
    },
    image: {
        type: String,
        required: 'Se requiere una imagen de título.'
    },
    cover: {
        type: String,
        required: 'Se requiere una imagen de portada.'
    },
    rating: {
        type: Number,
        default: 0.0
    },
    classification: {
        type: mongoose.Types.ObjectId,
        required: 'El juego debe estar clasificado.'
    },
    genre: {
        type: [mongoose.Types.ObjectId],
        validate: {
            validator: v => Array.isArray(v) & v.length > 0,
            message: 'El juego debe tener al menos un género asociado.'
        },
        ref: 'clasificaciones',
        required: 'El juego debe tener al menos un género asociado.'
    },
    developers: {
        type: [mongoose.Types.ObjectId],
        validate: {
            validator: v => Array.isArray(v) & v.length > 0,
            message: 'El juego debe tener al menos un desarrollador asociado.'
        },
        ref: 'desarrolladores',
        required: 'El juego debe tener al menos un desarrollador asociado.'
    },
    platforms: {
        type: [mongoose.Types.ObjectId],
        validate: {
            validator: v => Array.isArray(v) & v.length > 0,
            message: 'El juego debe tener al menos una plataforma asociada.'
        },
        ref: 'plataformas',
        required: 'El juego debe tener al menos una plataforma asociada.'
    },
    followers: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: 'Se requiere el ID del creador.'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

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