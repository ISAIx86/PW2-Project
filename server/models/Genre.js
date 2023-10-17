const mongoose = require('mongoose')
const errorMessages = require('../handlers/error-messages.json')

const genre_schema = new mongoose.Schema({
    title: {
        type: String,
        required: errorMessages.genre['required-name']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: errorMessages.genre['required-author'],
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('generos', genre_schema)