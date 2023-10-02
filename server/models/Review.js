const mongoose = require('mongoose')
const errorMessages = require('../handlers/error-messages.json')

const review_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'articulos',
        required: errorMessages.review['required-id']
    },
    rate: {
        type: Number,
        validate: {
            validator: v => v >= 0 & v <= 5,
            message: errorMessages.review['bad-rate']
        },
        required: errorMessages.review['required-rate']
    },
    content: {
        type: String,
        required: errorMessages.review['required-content']
    },
    author: {
        type: mongoose.Types.ObjectId,
        validate: {
            validator: async function (v) {
                const result = await this.constructor.findOne({_id: {$ne: this.id}, is_deleted: false, author: v})
                return !result
            },
            message: errorMessages.review['already-review']
        },
        ref: 'usuarios',
        required: errorMessages.review['required-author']
    },
    game: {
        type: mongoose.Types.ObjectId,
        ref: 'juegos',
        required: errorMessages.review['required-game']
    }
})

module.exports = mongoose.model('resenas', review_schema)