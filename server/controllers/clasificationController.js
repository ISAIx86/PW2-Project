const config = require('../config')
const mongoose = require('mongoose')
const Classification = mongoose.model('clasificaciones')
const uploader = require('../middlewares/uploader')
const fs = require('fs')

exports.create = async (req, res) => {

    const {
        title
    } = req.body

    const new_class = new Classification({
        title,
        created_by: req.payload.id
    })

    if (req.files && req.files.image)
        await new_class.uploadImage(req.files.image)

    await new_class.save()

    res.json({
        message: 'Clasificación creada exitosamente!'
    })

}

exports.modify = async (req, res) => {

    const {
        id,
        title
    } = req.body

    const curr_class = await Classification.findOne({
        _id: id,
        is_deleted: false
    })

    if (!curr_class) throw "No se pudo encontrar una clasificación con ese ID."

    curr_class.set({
        title
    })

    if (req.files && req.files.image)
        await curr_class.uploadImage(req.files.image)

    await curr_class.save()

    res.json({
        message: 'Clasificación modificada exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { id } = req.body

    const curr_class = await Classification.findById(id)

    if (!curr_class) throw "No se pudo encontrar una clasificación con ese ID."

    curr_class.set({
        is_deleted: true
    })

    curr_class.save()

    res.json({
        message: 'Clasificación eliminada exitosamente!'
    })

}