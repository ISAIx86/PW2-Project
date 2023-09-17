const mongoose = require('mongoose')

const report_schema = new mongoose.Schema({
    report_datetime: {
        type: Date,
        default: new Date()
    },
    article: {
        type: mongoose.Types.ObjectId,
        ref: 'articulos',
        required: 'La denuncia debe ser dirigida a un artículo.'
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: 'La denuncia debe tener un autor.'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('denuncias', report_schema)