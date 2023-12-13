const mongoose = require('mongoose')
const Developer = mongoose.model('desarrolladores')
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

    const dev = new Developer({
        title,
        created_by: req.payload.id
    })

    await dev.save()

    await MongooseManager.disconnect()

    modlogger.log('create', `mod (${moderator.username}) created developer: ${dev.title}.`)
    sendResponse(res, "Desarrollador añadida exitosamente.")

}

// Updates
exports.modify = async (req, res) => {

    const {
        devID,
        title
    } = req.body

    await MongooseManager.connect()

    const dev = await Developer.findOne({
        _id: devID,
        is_deleted: false
    })
    if (!dev) throw errorMessages.develop['not-found']

    dev.set({
        title: typeof title !== 'undefined' ? title : dev.title
    })

    await dev.save()

    await MongooseManager.disconnect()

    sendResponse(res, "Desarrollador modificado exitosamente.")

}

exports.delete = async (req, res) => {

    const { devID } = req.body
    const id = req.payload.id

    await MongooseManager.connect()

    const moderator = await User.findOne({_id: id, is_mod: true, is_deleted: false})
    if (!moderator) throw errorMessages.users['id-not-found']

    const dev = await Developer.findOne({
        _id: devID,
        is_deleted: false
    })
    if (!dev) throw errorMessages.develop['not-found']

    dev.set({
        is_deleted: true
    })

    dev.save()

    modlogger.log('delete', `mod (${moderator.username}) deleted developer: ${dev.title}.`)
    sendResponse(res, "Desarrollador eliminado exitosamente.")
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body

    if (typeof text_input === 'undefined' | text_input === "")
        throw errorMessages.general['empty-serach']
    
    const results = await Developer
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )
        .limit(textSearchLimit)

    await MongooseManager.disconnect()

    sendResponse(res, results)

}

exports.getById = async (req, res) => {

    const _dev_id = req.params._dev_id

    await MongooseManager.connect()

    const results = await Developer
        .findOne(
            {_id: _dev_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!results) throw errorMessages.develop['not-found']

    await MongooseManager.disconnect()

    sendResponse(res, results)

}