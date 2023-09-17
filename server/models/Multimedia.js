const mongoose = require('mongoose')

const multimedia_schema = new mongoose.Schema({
    directory: {
        type: String,
        required: 'El archivo debe tener un directorio.'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: 'El archivo debe tener un autor.'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('multimedia', multimedia_schema)