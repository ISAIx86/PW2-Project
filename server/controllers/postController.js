const mongoose = require('mongoose')
const Article = mongoose.model('articulos')
const Post = mongoose.model('publicaciones')
const Game = mongoose.model('juegos')
const Multimedia = mongoose.model('multimedias')
const User = mongoose.model('usuarios')

const { sendResponse } = require('../handlers/answerHandler')
const errorMessages = require('../handlers/error-messages.json')

// Create
exports.create = async (req, res) => {

    const {
        game_id,
        content
    } = req.body
    const id = req.payload.id

    if (typeof game_id !== 'undefined' && game_id !== "") {
        const game = await Game.findOne({_id: game_id, is_deleted: false})
        if (!game) throw errorMessages.games['id-not-found']
    }

    const article = new Article({
        article_type: 'post',
        author: id
    })
    const post = new Post({
        _id: article.id,
        content: content !== "" ? content : undefined,
        author: id,
        game: game_id !== "" ? game_id : undefined
    })

    const media_files = []
    const media_objects = []
    const media_ids = []
    if (req.files && req.files.multimedia) {
        Array.isArray(req.files.multimedia) ? media_files.push(...req.files.multimedia) : media_files.push(req.files.multimedia)
        for (let i = 0; i < media_files.length; i++) {
            const new_media = new Multimedia({
                created_by: id
            })
            const success_upload = await new_media.upload(post.id, i, media_files[i])
            if (success_upload) {
                media_objects.push(new_media)
                media_ids.push(new_media.id)
            }
        }
        for (const media of media_objects) await media.save()
        post.multimedia = media_ids
    }

    await post.save()
    await article.save()

    sendResponse(res, "Publicación exitosa.")

}

// Updates
exports.delete = async (req, res) => {

    const { postID } = req.body
    const id = req.payload.id

    const article = await Article.find({_id: postID, is_deleted: false, article_type: 'post'})
    if (!article) throw errorMessages.article['not-found']

    const post = await Post.findOne({_id: article.id})
    const user = await User.findOne({_id: id, is_deleted: false})
    if (!post) throw errorMessages.posts['id-not-found']
    if (!user) throw errorMessages.users['id-not-found']
    if (post.author !== user._id) throw errorMessages.posts['invalid-author']

    article.set({
        is_deleted: true
    })

    await article.save()

    sendResponse(res, "Publicación eliminada.")

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
    if (!user) throw errorMessages.users['not-found']

    if (user.is_private) throw errorMessages.users['private-account']
    
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
                container: {
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
                    publish_datetime: '$article.created_at',
                    you_like: {$in: [{$toObjectId: id}, '$article.users_likes']},
                    likes: {$size: '$article.users_likes'}
                }
            }},
            {$facet: {
                pagination_data: [
                    {$count: "total_docs"},
                    {$addFields: {page: page}},
                    {$addFields: {elements: elem_per_page}}
                ],
                data: [
                    {$skip: offset},
                    {$limit: elem_per_page}
                ]
            }}
        ])
    
    sendResponse(res, results)

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
    if (!game) throw errorMessages.games['nameid-not-found']

    const user = await User.findOne({_id: id, is_deleted: false})
    if (!user) throw errorMessages.users['id-not-found']

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
                    publish_datetime: '$article.created_at',
                    you_like: {$in: [{$toObjectId: user.id}, '$article.users_likes']},
                    likes: {$size: '$article.users_likes'}
                }
            }},
            {$facet: {
                pagination_data: [
                    {$count: "total_docs"},
                    {$addFields: {page: page}},
                    {$addFields: {elements: elem_per_page}}
                ],
                data: [
                    {$skip: offset},
                    {$limit: elem_per_page}
                ]
            }}
        ])

    sendResponse(res, results)

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
    if (!user) throw errorMessages.users['id-not-found']

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
                    publish_datetime: '$article.created_at',
                    you_like: {$in: [{$toObjectId: user.id}, '$article.users_likes']},
                    likes: {$size: '$article.users_likes'}
                }
            }},
            {$facet: {
                pagination_data: [
                    {$count: "total_docs"},
                    {$addFields: {page: page}},
                    {$addFields: {elements: elem_per_page}}
                ],
                data: [
                    {$skip: offset},
                    {$limit: elem_per_page}
                ]
            }}
        ])

    sendResponse(res, results)

}