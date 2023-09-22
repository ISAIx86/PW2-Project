const mongoose = require('mongoose')
const Article = mongoose.model('articulos')
const Post = mongoose.model('publicaciones')
const Game = mongoose.model('juegos')
const Multimedia = mongoose.model('multimedia')

// Create
exports.create = async (req, res) => {

    const {
        game_id,
        content
    } = req.body
    const id = req.payload.id

    if (typeof game_id !== 'undefined' && game_id !== "") {
        const game = await Game.findOne({_id: game_id, is_deleted: false})
        if (!game) throw "No se encontró un juego con este ID."
    }

    const article = new Article({
        article_type: 'post'
    })
    const post = new Post({
        _id: article.id,
        content: content !== "" ? content : undefined,
        author: id,
        game: game_id !== "" ? game_id : undefined
    })

    const multim_files = []
    const multim_objects = []
    const multim_ids = []
    if (req.files && req.files.multimedia) {
        Array.isArray(req.files.multimedia) ? multim_files.push(...req.files.multimedia) : multim_files.push(req.files.multimedia)
        for (let i = 0; i < multim_files.length; i++) {
            const new_multim = new Multimedia({
                created_by: id
            })
            const success_upload = await new_multim.upload(post.id, i, multim_files[i])
            if (success_upload) {
                multim_objects.push(new_multim)
                multim_ids.push(new_multim.id)
            }
        }
        for (const mult of multim_objects) await mult.save()
        post.multimedia = multim_ids
    }

    await post.save()
    await article.save()

    res.json({
        message: "Publicación exitosa."
    })

}