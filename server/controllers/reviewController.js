const mongoose = require('mongoose')
const Article = mongoose.model('articulos')
const Review = mongoose.model('resenas')
const Game = mongoose.model('juegos')

// Create
exports.create = async (req, res) => {

    const {
        game_id,
        rate,
        content
    } = req.body
    const id = req.payload.id

    const game = await Game.findOne({_id: game_id, is_deleted: false})
    if (!game) throw "No se encontró un juego con este ID."

    const article = new Article({
        article_type: 'review'
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

    const new_rate = await Review
        .aggregate([
            {$lookup: {
                from: 'articulos',
                localField: '_id',
                foreignField: '_id',
                as: 'article_details'
            }},
            {$project: {
                game: 1,
                rate: 1,
                is_deleted: "$article_details.is_deleted"
            }},
            {$match: {
                game: new mongoose.Types.ObjectId(game_id),
                is_deleted: false
            }},
            {$group: {
                _id: "$game",
                avg_rate: {$avg: "$rate"}
            }}
        ])

    game.setRating(new_rate[0].avg_rate)
    await game.save()
    
    res.json({
        message: "Reseña publicada con éxito."
    })

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
    if (!game) throw "No se pudo encontrar un juego con este código de nombre."

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