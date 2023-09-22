const mongoose = require('mongoose')

const review_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'articulos',
        required: 'Debe tener ID de artículo.'
    },
    rate: {
        type: Number,
        validate: {
            validator: v => v >= 0 & v <= 5,
            message: 'El valor no está dentro del rango permitido.'
        },
        required: 'La calificación es requerida.'
    },
    content: {
        type: String,
        required: 'La reseña debe contener un texto.'
    },
    author: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: async function (v) {
                const result = await this.constructor.findOne({_id: {$ne: this.id}, is_deleted: false, author: v})
                return !result
            },
            message: 'Ya has reseñado este juego.'
        },
        ref: 'usuarios',
        required: 'La reseña debe tener un autor.'
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'juegos',
        required: 'La reseña debe ser dirigida a un juego.'
    }
})

module.exports = mongoose.model('resenas', review_schema)