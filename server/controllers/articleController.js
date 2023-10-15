const mongoose = require('mongoose')
const Article = mongoose.model('articulos')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

// Updates
exports.like = async (req, res) => {

    const { artID } = req.body
    const id = req.payload.id

    const article = await Article.findOne({_id: artID, is_deleted: false})
    if (!article) throw errorMessages.article['not-found']

    if (article.users_likes.includes(id))
        throw errorMessages.article['already-like']

    await Article.updateOne(
        {_id: article.id},
        {$push: {users_likes: id}}
    )

    sendResponse(res, "Like añadido.")

}

exports.unlike = async (req, res) => {

    const { artID } = req.body
    const id = req.payload.id

    const article = await Article.findOne({_id: artID, is_deleted: false})
    if (!article) throw errorMessages.article['not-found']

    if (!article.users_likes.includes(id))
        throw errorMessages.article['already-unlike']

    await Article.updateOne(
        {_id: article.id},
        {$pull: {users_likes: id}}
    )

    sendResponse(res, "Like retirado.")

}