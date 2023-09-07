const mongoose = require('mongoose')

const classification_schema = new mongoose.Schema({
    title: {
        type: String,
        required: 'La Clasificación requiere un nombre.'
    },
    image: {
        type: String,
        required: 'La Clasificación requiere una imagen.'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: 'La Clasificacción requiere el ID del autor.',
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

classification_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

module.exports = mongoose.model('clasificaciones', classification_schema)