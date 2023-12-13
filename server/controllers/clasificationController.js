const mongoose = require('mongoose')
const Classification = mongoose.model('clasificaciones')
const User = mongoose.model('usuarios')

const MongooseManager = require('../handlers/mongooseManager')
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

    await MongooseManager.connect()

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const clasif = new Classification({
        title,
        created_by: req.payload.id
    })

    if (req.files && req.files.image)
        await clasif.uploadImage(req.files.image)

    await clasif.save()

    await MongooseManager.disconnect()

    modlogger.log('create', `mod (${moderator.username}) created classification: ${clasif.title}.`)
    sendResponse(res, "Clasificación creada exitosamente.")

}

// Updates
exports.modify = async (req, res) => {

    const {
        clID,
        title
    } = req.body

    await MongooseManager.connect()

    const clasif = await Classification.findOne({
        _id: clID,
        is_deleted: false
    })
    if (!clasif) throw errorMessages.classif['not-found']

    clasif.set({
        title: typeof title !== 'undefined' ? title : clasif.title
    })

    if (req.files && req.files.image)
        await clasif.uploadImage(req.files.image)

    await clasif.save()

    await MongooseManager.disconnect()

    sendResponse(res, "Clasificación modificada exitosamente.")

}

exports.delete = async (req, res) => {

    const { clID } = req.body
    const id = req.payload.id

    await MongooseManager.connect()

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const clasif = await Classification.findOne({
        _id: clID,
        is_deleted: false
    })
    if (!clasif) throw errorMessages.classif['not-found']

    clasif.set({
        is_deleted: true
    })

    clasif.save()

    await MongooseManager.disconnect()

    modlogger.log('delete', `mod (${moderator.username}) deleted classification: ${clasif.title}.`)
    sendResponse(res, "Clasificación eliminada exitosamente.")

}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body

    await MongooseManager.connect()

    if (typeof text_input === 'undefined' | text_input === "")
        throw errorMessages.general['empty-serach']
    
    const results = await Classification
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {image:1, title:1}
        )
        .limit(textSearchLimit)

    await MongooseManager.disconnect()

    sendResponse(res, results)

}

exports.getById = async (req, res) => {

    const _class_id = req.params._class_id

    await MongooseManager.connect()

    const result = await Classification
        .findOne(
            {_id: _class_id, is_deleted: false},
            {title: 1, image: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!result) throw errorMessages.classif['not-found']

    await MongooseManager.disconnect()

    sendResponse(res, results)

}