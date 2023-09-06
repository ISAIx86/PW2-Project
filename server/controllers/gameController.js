const mongoose = require('mongoose')
const Game = mongoose.model('juegos')
const uploader = require('../middlewares/uploader')
const fs = require('fs')

exports.create = async (req, res) => {

    const {
        titulo,
        descrip,
        classification,
        genre,
        developers,
        platforms
    } = req.body

    if (!req.files.image) throw "Se requiere de una imagen de título."
    if (!req.files.cover) throw "Se requiere de una imagen de portada."

    const game = new Game({
        titulo,
        descrip,
        classification,
        genre,
        developers,
        platforms
    })

    // SUBIR IMAGEN DE JUEGO y checar si existe.
    let path = await uploader.uploadInDestiny(
        './resources/game_images',
        req.files.image,
        game.id
    )
    if (fs.existsSync(path.final_path))
        game.setImage(path.new_filename)

    // SUBIR PORTADA DE JUEGO y checar si existe
    path = await uploader.uploadInDestiny(
        './resources/game_covers',
        req.files.cover,
        game.id
    )
    if (fs.existsSync(path.final_path))
        game.setCover(path.new_filename)

    await game.save()

    res.json({
        message: "Juego agregado exitosamente!"
    })

}

exports.modify = async (req, res) => {

    const {
        id,
        titulo,
        descrip,
        clasification,
        genre,
        developers,
        platforms
    } = req.body

    const game = await Game.findById(id)

    if (!game || game.is_deleted) throw "No se pudo encontrar un juego con este ID."

    game.set({
        titulo,
        descrip,
        clasification,
        genre,
        developers,
        platforms
    })

    // SUBIR NUEVA IMAGEN DE JUEGO, si existe
    if (req.files && req.files.image) {
        const path = await uploader.uploadInDestiny(
            './resources/game_images',
            req.files.image,
            game.id
        )
        if (fs.existsSync(path.final_path))
            game.setImage(path.new_filename)
    }

    // SUBIR NUEVA PORTADA DE JUEGO, si existe
    if (req.files && req.files.cover) {
        const path = await uploader.uploadInDestiny(
            './resources/game_covers',
            req.files.cover,
            game.id
        )
        if (fs.existsSync(path.final_path))
            game.setImage(path.new_filename)
    }

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

    const id = req.params.game_id

    const game = await Game.findById(id)

    if (!game || game.is_deleted) throw "Juego no encontrado :C"

    res.json({
        message: "Lo tengo! Aquí está",
        juego: game
    })

}