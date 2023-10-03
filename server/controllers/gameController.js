const mongoose = require('mongoose')
const Game = mongoose.model('juegos')
const User = mongoose.model('usuarios')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

// Create
exports.create = async (req, res) => {

    const {
        name_id,
        title,
        descrip,
        release_date,
        classification,
        genre,
        developers,
        platforms
    } = req.body
    const id = req.payload.id

    const game = new Game({
        name_id,
        title,
        descrip,
        release_date,
        classification,
        genre,
        developers,
        platforms,
        created_by: id
    })

    await game.validate(['name_id'])

    // SUBIR IMAGEN DE JUEGO
    if (req.files && req.files.image)
        await game.uploadImage('title', req.files.image)

    // SUBIR PORTADA DE JUEGO
    if (req.files && req.files.cover)
        await game.uploadImage('cover', req.files.cover)

    await game.save()

    sendResponse(res, "Juego agregado exitosamente.")

}

// Updates
exports.modify = async (req, res) => {

    const {
        gameID,
        name_id,
        title,
        descrip,
        release_date,
        classification,
        genre,
        developers,
        platforms
    } = req.body

    const game = await Game.findOne({
        _id: gameID,
        is_deleted: false
    })
    if (!game) throw errorMessages.games['id-not-found']

    game.set({
        name_id: typeof name_id !== 'undefined' ? name_id : game.name_id,
        title: typeof title !== 'undefined' ? title : game.title,
        descrip: typeof descrip !== 'undefined' && descrip !== '' ? descrip : game.descrip,
        release_date: typeof release_date !== 'undefined' ? release_date : game.release_date,
        classification: typeof classification !== 'undefined' ? classification : game.classification,
        genre: typeof genre !== 'undefined' ? genre : game.genre,
        developers: typeof developers !== 'undefined' ? developers : game.developers,
        platforms: typeof platforms !== 'undefined' ? platforms : game.platforms
    })

    await game.validate(['name_id'])

    // SUBIR NUEVA IMAGEN DE JUEGO
    if (req.files && req.files.image)
        await game.uploadImage('title', req.files.image)
    // SUBIR NUEVA PORTADA DE JUEGO
    if (req.files && req.files.cover)
        await game.uploadImage('cover', req.files.cover)

    await game.save()

    sendResponse(res, "Juego modificado exitosamente.")

}

exports.delete = async (req, res) => {

    const { gameID } = req.body

    const game = await Game.findById(gameID)

    game.set({
        is_deleted: true
    })

    game.save()

    sendResponse(res, "Juego eliminado exitosamente.")

}

exports.follow = async (req, res) => {

    const { target_id } = req.body
    const id = req.payload.id

    const game = await Game
        .findOne({_id: target_id, is_deleted: false})
    const user = await User
        .findOne({_id: id, is_deleted: false})
    if (!user) throw errorMessages.users['id-not-found']
    if (!game) throw errorMessages.games['id-not-found']

    if (!game.followers.includes(user.id))
        await Game.updateOne(
            {_id: game.id},
            {$push: {followers: user.id}}
        )
    if (!user.following_games.includes(game.id))
        await User.updateOne(
            {_id: user.id},
            {$push: {following_games: game.id}}
        )

    if (user.following_games.includes(game.id)) throw errorMessages.games['already-follow']
    if (game.followers.includes(user.id)) throw errorMessages.games['already-follow']

    sendResponse(res, "Seguimiento de juego exitoso.")

}

exports.unfollow = async (req, res) => {

    const { target_id } = req.body
    const id = req.payload.id

    const game = await Game
        .findOne({_id: target_id})
    const user = await User
        .findOne({_id: id})
        if (!user) throw errorMessages.users['id-not-found']
        if (!game) throw errorMessages.games['id-not-found']

    if (game.followers.includes(user.id))
        await Game.updateOne(
            {_id: game.id},
            {$pull: {followers: user.id}}
        )
    if (user.following_games.includes(game.id))
        await User.updateOne(
            {_id: user.id},
            {$pull: {following_games: game.id}}
        )

    if (!user.following_games.includes(game.id)) throw errorMessages.games['already-unfollow']
    if (!game.followers.includes(user.id)) throw errorMessages.games['already-unfollow']

    sendResponse(res, "Juego eliminado de tus juegos seguidos.")

}

// Queries
exports.getOne = async (req, res) => {

    const name_id = req.params._game_id
    const id = req.payload.id

    const game = await Game
        .findOne(
            {name_id, is_deleted: false},
            {
                image: 1,
                cover: 1,
                title: 1,
                rating: 1,
                followers: {$size: '$followers'},
                release_date: '$release_date',
                developers: 1,
                platforms: 1,
                genre: 1,
                descrip: 1,
                classification: 1,
                is_following: {$in: [{$toObjectId: id}, "$followers"]}
            }
        )
        .populate('developers', 'title -_id')
        .populate('platforms', 'title -_id')
        .populate('genre', 'title -_id')
        .populate('classification', 'title image -_id')

    if (!game) throw errorMessages.games['not-found']

    sendResponse(res, game)

}

exports.searchByName = async (req, res) => {

    const { text_input } = req.body
    const id = req.payload.id

    if (typeof text_input === 'undefined' | text_input === "") throw errorMessages.general['empty-serach']

    const results = await Game
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {
                image:1, name_id:1, title:1, developers:1, year:{$year: "$release_date"},
                is_following: {$in: [{$toObjectId: id}, "$followers"]}
            }
        )
        .populate('developers', 'title -_id')
    
    sendResponse(res, results)

}