const mongoose = require('mongoose')
const errorMessages = require('../handlers/errorHandling/error-messages.json')

// -- SCHEMA --
const platform_schema = new mongoose.Schema({
    title: {
        type: String,
        required: errorMessages.platform['required-name']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: errorMessages.platform['required-author'],
        ref: 'usuarios'},
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('plataformas', platform_schema)