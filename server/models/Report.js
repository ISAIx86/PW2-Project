const mongoose = require('mongoose')
const errorMessages = require('../handlers/error-messages.json')

const report_schema = new mongoose.Schema({
    report_datetime: {
        type: Date,
        default: new Date()
    },
    article: {
        type: mongoose.Types.ObjectId,
        ref: 'articulos',
        required: errorMessages.reports['required-article']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: errorMessages.reports['required-author']
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('denuncias', report_schema)