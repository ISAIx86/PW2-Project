const mongoose = require('mongoose')
const Article = mongoose.model('articulos')
const Post = mongoose.model('publicaciones')
const Game = mongoose.model('juegos')
const Multimedia = mongoose.model('multimedias')
const User = mongoose.model('usuarios')

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

// Updates
exports.delete = async (req, res) => {

    const { postID } = req.body
    const id = req.payload.id

    const article = await Article.find({_id: postID, is_deleted: false, article_type: 'post'})
    if (!article) throw "No se encontró una publicación con este ID"

    const post = await Post.find({_id: article.id})
    if (post.author !== id) throw "No eres autor de esta publicación."

    article.set({
        is_deleted: true
    })

    await article.save()

    res.json({
        message: "Publicación eliminada."
    })

}

// Queries
exports.getByUser = async (req, res) => {

    const { _username } = req.params
    let { page, elem_per_page } = req.query
    const id = req.payload.id

    page = Math.floor(typeof page !== 'undefined' & page !== '' ? page : 1)
    elem_per_page = Math.floor(typeof elem_per_page !== 'undefined' & elem_per_page !== '' ? elem_per_page : 10)

    if (page <= 0) page = 1
    if (elem_per_page < 10) elem_per_page = 10

    const offset = ((page - 1) * elem_per_page)

    const user = await User.findOne({username: _username, is_deleted: false})
    if (!user) throw "No se encontró el usuario."

    if (user.is_private) throw "Esta cuenta es privada."

    const results = await Post
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: '_id',
                foreignField: '_id',
                as: 'article'
            }}, {$unwind: '$article'},
            {$lookup: {
                from: 'usuarios',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }}, {$unwind: '$author'},
            {$lookup: {
                from: 'juegos',
                localField: 'game',
                foreignField: '_id',
                as: 'game'
            }}, {$unwind: {path:'$game', preserveNullAndEmptyArrays: true}},
            {$lookup: {
                from: 'multimedias',
                localField: 'multimedia',
                foreignField: '_id',
                as: 'multimedia'
            }},
            {$match: {
                'author._id': user._id,
                'article.is_deleted': false
            }},
            {$project: {
                _id: 1,
                user_card: {
                    image: '$author.image',
                    username: '$author.username'
                },
                game_card: {$cond: [
                    { $ifNull: ['$game', false]},
                    {name_id: '$game.name_id', image: '$game.image', title: '$game.title'},
                    '$$REMOVE'
                ]},
                content: {
                    content: '$content',
                    multimedia: {$map: {
                        input: '$multimedia',
                        as: 'file',
                        in: {
                            source: '$$file.directory'
                        }
                    }}
                },
                article_details: {
                    publish_datetime: '$article.publish_datetime',
                    you_like: {$in: [{$toObjectId: id}, '$article.users_likes']},
                    likes: {$size: '$article.users_likes'}
                }
            }}
        ])
        .skip(offset)
        .limit(elem_per_page)

    res.json({
        results
    })

}

exports.getByGame = async (req, res) => {

    const { _game_id } = req.params
    let { page, elem_per_page } = req.query
    const id = req.payload.id

    page = Math.floor(typeof page !== 'undefined' & page !== '' ? page : 1)
    elem_per_page = Math.floor(typeof elem_per_page !== 'undefined' & elem_per_page !== '' ? elem_per_page : 10)

    if (page <= 0) page = 1
    if (elem_per_page < 10) elem_per_page = 10

    const offset = ((page - 1) * elem_per_page)

    const game = await Game.findOne({name_id: _game_id, is_deleted: false})
    if (!game) throw "No se pudo encontrar el juego con este código de nombre."

    const user = await User.findOne({_id: id, is_deleted: false})
    if (!user) throw "No se pudo encontrar el usuario con este ID."

    const results = await Post
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: '_id',
                foreignField: '_id',
                as: 'article'
            }}, {$unwind: '$article'},
            {$lookup: {
                from: 'usuarios',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }}, {$unwind: '$author'},
            {$lookup: {
                from: 'juegos',
                localField: 'game',
                foreignField: '_id',
                as: 'game'
            }}, {$unwind: '$game'},
            {$lookup: {
                from: 'multimedias',
                localField: 'multimedia',
                foreignField: '_id',
                as: 'multimedia'
            }},
            {$match: {
                'game._id': game._id,
                'article.is_deleted': false
            }},
            {$project: {
                _id: 1,
                user_card: {
                    image: '$author.image',
                    username: '$author.username'
                },
                game_card: {$cond: [
                    { $ifNull: ['$game', false]},
                    {name_id: '$game.name_id', image: '$game.image', title: '$game.title'},
                    '$$REMOVE'
                ]},
                content: {
                    content: '$content',
                    multimedia: {$map: {
                        input: '$multimedia',
                        as: 'file',
                        in: {
                            source: '$$file.directory'
                        }
                    }}
                },
                article_details: {
                    publish_datetime: '$article.publish_datetime',
                    you_like: {$in: [{$toObjectId: user.id}, '$article.users_likes']},
                    likes: {$size: '$article.users_likes'}
                }
            }}
        ])
        .skip(offset)
        .limit(elem_per_page)

    res.json({
        results
    })

}

exports.getFeed = async (req, res) => {

    let { page, elem_per_page } = req.query
    const id = req.payload.id

    page = Math.floor(typeof page !== 'undefined' & page !== '' ? page : 1)
    elem_per_page = Math.floor(typeof elem_per_page !== 'undefined' & elem_per_page !== '' ? elem_per_page : 10)

    if (page <= 0) page = 1
    if (elem_per_page < 10) elem_per_page = 10

    const offset = ((page - 1) * elem_per_page)

    const user = await User.findOne({_id: id, is_deleted: false})
    if (!user) throw "No se pudo encontrar el usuario con este ID."

    const following_games = user.following_games.map((item) => {return new mongoose.Types.ObjectId(item)})
    const following_users = user.following.map((item) => {return new mongoose.Types.ObjectId(item)})

    const results = await Post
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: '_id',
                foreignField: '_id',
                as: 'article'
            }}, {$unwind: '$article'},
            {$lookup: {
                from: 'usuarios',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }}, {$unwind: '$author'},
            {$lookup: {
                from: 'juegos',
                localField: 'game',
                foreignField: '_id',
                as: 'game'
            }}, {$unwind: {path:'$game', preserveNullAndEmptyArrays: true}},
            {$lookup: {
                from: 'multimedias',
                localField: 'multimedia',
                foreignField: '_id',
                as: 'multimedia'
            }},
            {$sort: {
                'article.publish_datetime': -1
            }},
            {$match: {
                $expr: {$or: [
                    {$in: ['$game._id', following_games]},
                    {$in: ['$author._id', following_users]}
                ]},
                'article.is_deleted': false
            }},
            {$project: {
                _id: 1,
                user_card: {
                    image: '$author.image',
                    username: '$author.username'
                },
                game_card: {$cond: [
                    { $ifNull: ['$game', false]},
                    {name_id: '$game.name_id', image: '$game.image', title: '$game.title'},
                    '$$REMOVE'
                ]},
                content: {
                    content: '$content',
                    multimedia: {$map: {
                        input: '$multimedia',
                        as: 'file',
                        in: {
                            source: '$$file.directory'
                        }
                    }}
                },
                article_details: {
                    publish_datetime: '$article.publish_datetime',
                    you_like: {$in: [{$toObjectId: user.id}, '$article.users_likes']},
                    likes: {$size: '$article.users_likes'}
                }
            }}
        ])
        .skip(offset)
        .limit(elem_per_page)

    res.json({
        results
    })

}