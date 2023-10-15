const mongoose = require('mongoose')
const Article = mongoose.model('articulos')
const Review = mongoose.model('resenas')
const Game = mongoose.model('juegos')
const User = mongoose.model('usuarios')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

const updateRating = async (game_id) => {

    const new_rate = await Review
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: '_id',
                foreignField: '_id',
                as: 'article_details'
            }}, {$unwind: '$article_details'},
            {$match: {
                'game': new mongoose.Types.ObjectId(game_id),
                'article_details.is_deleted': false
            }},
            {$project: {
                game: '$game',
                rate: '$rate',
                is_deleted: "$article_details.is_deleted"
            }},
            {$group: {
                _id: "$game",
                avg_rate: {$avg: "$rate"}
            }}
        ])

    return new_rate[0].avg_rate

}

// Create
exports.create = async (req, res) => {

    const {
        game_id,
        rate,
        content
    } = req.body
    const id = req.payload.id

    const game = await Game.findOne({_id: game_id, is_deleted: false})
    if (!game) throw errorMessages.games['id-not-found']

    const is_reviewed = await Review.findOne({
        author: id,
        game: game_id,
    })
    if (is_reviewed) throw errorMessages.review['already-review']

    const article = new Article({
        article_type: 'review',
        author: id
    })
    const review = new Review({
        _id: article.id,
        rate,
        content,
        author: id,
        game: game_id
    })

    await review.save()
    await article.save()

    game.set({
        rating: await updateRating(game.id)
    })
    await game.save()
    
    sendResponse(res, "Reseña publicada con éxito.")

}

exports.delete = async (req, res) => {

    const { revID } = req.body
    const id = req.payload.id

    const article = await Article.findOne({_id: revID, is_deleted: false, article_type: 'review'})
    if (!article) throw errorMessages.article['not-found']

    const review = await Review.findOne({_id: article.id})
    const user = await User.findOne({id: id, is_deleted: false})
    if (!review) throw errorMessages.review['id-not-found']
    if (!user) throw errorMessages.users['id-not-found']
    if (review.author !== user._id) throw errorMessages.review['invalid-author']

    article.set({
        is_deleted: true
    })

    await article.save()

    await Game.updateOne(
        {_id: review.game, is_deleted: false},
        {rating: await updateRating(review.game)}
    )

    sendResponse(res, "Reseña eliminada.")

}

// Queries
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

    const results = await Review.aggregate([
        {$lookup:{
            from: 'articulos',
            localField: '_id',
            foreignField: '_id',
            as: 'article'
        }}, {$unwind: '$article'},
        {$lookup:{
            from: 'usuarios',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
        }}, {$unwind: '$author'},
        {$match:{
            'game': game._id,
            'article.is_deleted': false
        }},
        {$project: {
            _id: 1,
            user_card: {
                image: '$author.image',
                username: '$author.username'
            },
            container: {content: '$content', rate: '$rate'},
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