const mongoose = require('mongoose')

const article_schema = new mongoose.Schema({
    article_type: {
        type: String,
        required: 'El tipo de artículo es requerido.'
    },
    publish_datetime: {
        type: Date,
        default: new Date()
    },
    users_likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('articulos', article_schema)