const mongoose = require('mongoose')
const errorMessages = require('../handlers/error-messages.json')

const report_schema = new mongoose.Schema({
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
    solved_by: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios'
    },
    solved_text: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('denuncias', report_schema)