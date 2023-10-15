const mongoose = require('mongoose')
const errorMessages = require('../handlers/error-messages.json')

const article_schema = new mongoose.Schema({
    article_type: {
        type: String,
        required: errorMessages.article['required-type']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: errorMessages.posts['required-author']
    },
    users_likes: {
        type: [mongoose.Types.ObjectId],
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('articulos', article_schema)