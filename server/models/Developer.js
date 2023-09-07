const mongoose = require('mongoose')

const dev_schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'El Desarrollador requiere un nombre.'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: 'El Desarrollador requiere el ID del autor.',
        ref:'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('desarrolladores', dev_schema)