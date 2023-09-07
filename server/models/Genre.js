const mongoose = require('mongoose')

const genre_schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'El Género requiere un nombre.'
    },
    games: {
        type: [mongoose.Types.ObjectId],
        ref: 'juegos'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: 'El Género requiere el ID del autor.',
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('generos', genre_schema)