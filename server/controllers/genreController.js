const mongoose = require('mongoose')
const Genre = mongoose.model('generos')
const User = mongoose.model('usuarios')

const { sendResponse } = require('../handlers/answerHandler')
const { modlogger } = require('../middlewares/logger')
const config = require('../config')
const errorMessages = require('../handlers/errorHandling/error-messages.json')

const textSearchLimit = config.appConfig.textSearchBaseLimit

// Create
exports.create = async (req, res) => {

    const {
        title
    } = req.body
    const id = req.payload.id

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const genre = new Genre({
        title,
        created_by: req.payload.id
    })

    await genre.save()

    modlogger.log('create', `mod (${moderator.username}) created genre: ${genre.title}.`)
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
    const id = req.payload.id

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const genre = await Genre.findOne({
        _id: genID,
        is_deleted: false
    })
    if (!genre) throw errorMessages.genre['id-not-found']

    genre.set({
        is_deleted: true
    })

    genre.save()

    modlogger.log('delete', `mod (${moderator.username}) deleted genre: ${genre.title}.`)
    sendResponse(res, "Género eliminado exitosamente.")
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body

    if (typeof text_input === 'undefined' | text_input === "") throw errorMessages.general['empty-serach']
    
    const results = await Genre
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )
        .limit(textSearchLimit)

    sendResponse(res, results)

}

exports.getById = async (req, res) => {

    const _genre_id = req.params._genre_id

    const results = await Genre
        .findOne(
            {_id: _genre_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!results) throw errorMessages.genre['id-not-found']

    sendResponse(res, results)

}