const mongoose = require('mongoose')

const platform_schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'La Plataforma requiere un nombre.'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: 'La Plataforma requiere el ID del autor.',
        ref: 'usuarios'},
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('plataformas', platform_schema)