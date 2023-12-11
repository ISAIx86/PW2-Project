const mongoose = require('mongoose')
const errorMessages = require('../handlers/errorHandling/error-messages.json')

// -- SCHEMA --
const dev_schema = new mongoose.Schema({
    title: {
        type: String,
        required: errorMessages.develop['required-name']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: errorMessages.develop['required-author'],
        ref:'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('desarrolladores', dev_schema)