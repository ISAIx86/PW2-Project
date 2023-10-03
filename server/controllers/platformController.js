const mongoose = require('mongoose')
const Platform = mongoose.model('plataformas')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

// Create
exports.create = async (req, res) => {

    const {
        title
    } = req.body

    const plat = new Platform({
        title,
        created_by: req.payload.id
    })

    await plat.save()

    sendResponse(res, "Plataforma añadida exitosamente.")

}

// Updates
exports.modify = async (req, res) => {

    const {
        platID,
        title
    } = req.body

    const plat = await Platform.findOne({
        _id: platID,
        is_deleted: false
    })

    if (!plat) throw errorMessages.platform['id-not-found']

    plat.set({
        title: typeof title !== 'undefined' ? title : plat.title
    })

    await plat.save()

    sendResponse(res, "Plataforma modificada exitosamente.")

}

exports.delete = async (req, res) => {

    const { platID } = req.body

    const plat = await Platform.findById(platID)

    if (!plat) throw errorMessages.platform['id-not-found']

    plat.set({
        is_deleted: true
    })

    plat.save()

    sendResponse(res, "Plataforma eliminada exitosamente.")
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body

    if (typeof text_input === 'undefined' | text_input === "") throw errorMessages.general['empty-serach']
    
    const results = await Platform
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )

    sendResponse(res, results)

}

exports.getById = async (req, res) => {

    const _plat_id = req.params._plat_id

    const results = await Platform
        .find(
            {_id: _plat_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!results) throw  errorMessages.platform['id-not-found']

    sendResponse(res, results)

}