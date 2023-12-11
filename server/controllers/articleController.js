const mongoose = require('mongoose')
const Article = mongoose.model('articulos')

const { sendResponse } = require('../handlers/answerHandler')
const { modlogger } = require('../middlewares/logger')
const errorMessages = require('../handlers/errorHandling/error-messages.json')

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

exports.killArticle = async (req, res) => {

    const { artID } = req.body
    const id = req.payload.id

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const article = await Article.findOne({_id: artID, is_deleted: false})
    if (!article) throw errorMessages.article['not-found']

    article.set({
        is_deleted: true
    })

    await article.save()

    modlogger.log('delete', `mod (${moderator.username}) deleted article: ${article.id}.`)
    sendResponse(res, "Artículo eliminado.")

}