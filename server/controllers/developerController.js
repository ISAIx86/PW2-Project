const mongoose = require('mongoose')
const Developer = mongoose.model('desarrolladores')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

// Create
exports.create = async (req, res) => {

    const {
        title
    } = req.body

    const dev = new Developer({
        title,
        created_by: req.payload.id
    })

    await dev.save()

    sendResponse(res, "Desarrollador añadida exitosamente.")

}

// Updates
exports.modify = async (req, res) => {

    const {
        devID,
        title
    } = req.body

    const dev = await Developer.findOne({
        _id: devID,
        is_deleted: false
    })

    if (!dev) throw errorMessages.develop['not-found']

    dev.set({
        title: typeof title !== 'undefined' ? title : dev.title
    })

    await dev.save()

    sendResponse(res, "Desarrollador modificado exitosamente.")

}

exports.delete = async (req, res) => {

    const { devID } = req.body

    const dev = await Developer.findById(devID)

    if (!dev) throw errorMessages.develop['not-found']

    dev.set({
        is_deleted: true
    })

    dev.save()

    sendResponse(res, "Desarrollador eliminado exitosamente.")
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body

    if (typeof text_input === 'undefined' | text_input === "") throw errorMessages.general['empty-serach']
    
    const results = await Developer
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )

    sendResponse(res, results)

}

exports.getById = async (req, res) => {

    const _dev_id = req.params._dev_id

    const results = await Developer
        .find(
            {_id: _dev_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!results) throw errorMessages.develop['not-found']

    sendResponse(res, results)

}