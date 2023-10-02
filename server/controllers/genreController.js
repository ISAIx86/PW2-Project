const mongoose = require('mongoose')
const Genre = mongoose.model('generos')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

// Create
exports.create = async (req, res) => {

    const {
        title
    } = req.body

    const genre = new Genre({
        title,
        created_by: req.payload.id
    })

    await genre.save()

    sendResponse(res, "Género creado exitosamente.")

}

// Updates
exports.modify = async (req, res) => {

    const {
        genID,
        title
    } = req.body

    const genre = await Genre.findOne({
        _id: genID,
        is_deleted: false
    })

    if (!genre) throw errorMessages.genre['id-not-found']

    genre.set({
        title: typeof title !== 'undefined' ? title : genre.title
    })

    await genre.save()

    sendResponse(res, "Género modificado exitosamente.")

}

exports.delete = async (req, res) => {

    const { genID } = req.body

    const genre = await Genre.findById(genID)

    if (!genre) throw errorMessages.genre['id-not-found']

    genre.set({
        is_deleted: true
    })

    genre.save()

    sendResponse(res, "Género eliminado exitosamente.")
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body
    
    const results = await Genre
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )

    sendResponse(res, results)

}

exports.getById = async (req, res) => {

    const _genre_id = req.params._genre_id

    const results = await Genre
        .find(
            {_id: _genre_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!results) throw errorMessages.genre['id-not-found']

    sendResponse(res, results)

}