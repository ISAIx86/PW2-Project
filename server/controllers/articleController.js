const mongoose = require('mongoose')
const Article = mongoose.model('articulos')

// Updates
exports.like = async (req, res) => {

    const { artID } = req.body
    const id = req.payload.id

    const article = await Article.findOne({_id: artID, is_deleted: false})
    if (!article) throw "Este artículo no se encontró."

    if (article.users_likes.includes(id)) throw "Ya diste like a este artículo."

    await Article.updateOne(
        {_id: article.id},
        {$push: {users_likes: id}}
    )

    res.json({
        message: "Like añadido."
    })

}

exports.unlike = async (req, res) => {

    const { artID } = req.body
    const id = req.payload.id

    const article = await Article.findOne({_id: artID, is_deleted: false})
    if (!article) throw "Este artículo no se encontró."

    if (!article.users_likes.includes(id)) throw "No se encontró tu like a este artículo."

    await Article.updateOne(
        {_id: article.id},
        {$pull: {users_likes: id}}
    )

    res.json({
        message: "Like retirado."
    })

}