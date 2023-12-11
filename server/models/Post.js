const mongoose = require('mongoose')
const errorMessages = require('../handlers/errorHandling/error-messages.json')

// -- SCHEMA --
const post_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'articulos',
        required: errorMessages.posts['required-id']
    },
    content: {
        type: String
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: errorMessages.posts['required-author']
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