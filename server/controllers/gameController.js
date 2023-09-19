const mongoose = require('mongoose')
const Game = mongoose.model('juegos')
const User = mongoose.model('usuarios')

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

    res.json({
        message: "Juego agregado exitosamente!"
    })

}

// Updates
exports.modify = async (req, res) => {

    const {
        id,
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
        _id: id,
        is_deleted: false
    })
    if (!game) throw "No se pudo encontrar un juego con este ID."

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

    res.json({
        message: "Juego modificado exitosamente!"
    })

}

exports.delete = async (req, res) => {

    const { id } = req.body

    const game = await Game.findById(id)

    game.set({
        is_deleted: true
    })

    game.save()

    res.json({
        message: "Juego eliminado exitosamente!"
    })

}

exports.follow = async (req, res) => {

    const { target_id } = req.body
    const id = req.payload.id

    const game = await Game
        .findOne({_id: target_id, is_deleted: false})
    const user = await User
        .findOne({_id: id, is_deleted: false})
    if (!user) throw "No se pudo encontrar un usuario con este ID."
    if (!game) throw "No se pudo encontrar un juego con este ID."

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

    if (user.following_games.includes(game.id)) throw "Ya sigues este juego."
    if (game.followers.includes(user.id)) throw "Ya sigues este juego."

    res.json({
        message: 'Seguimiento de juego exitoso.'
    })

}

exports.unfollow = async (req, res) => {

    const { target_id } = req.body
    const id = req.payload.id

    const game = await Game
        .findOne({_id: target_id, is_deleted: false})
    const user = await User
        .findOne({_id: id, is_deleted: false})
    if (!user) throw "No se pudo encontrar un usuario con este ID."
    if (!game) throw "No se pudo encontrar un juego con este ID."

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

    if (!user.following_games.includes(game.id)) throw "No sigues este juego."
    if (!game.followers.includes(user.id)) throw "No sigues este juego."

    res.json({
        message: 'Juego eliminado de tus juegos seguidos.'
    })

}

// Queries
exports.getOne = async (req, res) => {

    const name_id = req.params._gameid
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

    if (!game) throw "Juego no encontrado :C"

    res.json({
        message: "Lo tengo! Aquí está",
        result: game
    })

}

exports.searchByName = async (req, res) => {

    const { text_input } = req.body
    const id = req.payload.id

    const results = await Game
        .find(
            {title: {$regex: `.*${text_input}.*`}},
            {
                image:1, name_id:1, title:1, developers:1, year:{$year: "$release_date"},
                is_following: {$in: [{$toObjectId: id}, "$followers"]}
            }
        )
        .populate('developers', 'title -_id')
    
    res.json({
        results
    })

}