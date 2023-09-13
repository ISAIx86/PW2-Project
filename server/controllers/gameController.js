const mongoose = require('mongoose')
const Game = mongoose.model('juegos')

exports.create = async (req, res) => {

    const {
        name_id,
        title,
        descrip,
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

exports.modify = async (req, res) => {

    const {
        id,
        name_id,
        title,
        descrip,
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
        name_id,
        title,
        descrip,
        classification,
        genre,
        developers,
        platforms
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
        message: "Juego agregado exitosamente!"
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

exports.getOne = async (req, res) => {

    const name_id = req.params.game_id

    const game = await Game.findOne({
        name_id,
        is_deleted: false
    })

    if (!game) throw "Juego no encontrado :C"

    res.json({
        message: "Lo tengo! Aquí está",
        juego: game
    })

}