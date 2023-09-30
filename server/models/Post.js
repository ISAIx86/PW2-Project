const mongoose = require('mongoose')

const post_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'articulos',
        required: 'Debe tener ID de artículo.'
    },
    content: {
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: 'La publicación debe tener un autor.'
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'juegos'
    },
    multimedia: {
        type: [mongoose.Types.ObjectId],
        ref: 'multimedias'
    }
})

module.exports = mongoose.model('publicaciones', post_schema)