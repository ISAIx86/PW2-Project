const mongoose = require('mongoose')
const Platform = mongoose.model('plataformas')

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

    res.json({
        message: 'Plataforma añadida exitosamente!'
    })

}

// Updates
exports.modify = async (req, res) => {

    const {
        id,
        title
    } = req.body

    const plat = await Platform.findOne({
        _id: id,
        is_deleted: false
    })

    if (!plat) throw "No se pudo encontrar una plataforma con este ID"

    plat.set({
        title: typeof title !== 'undefined' ? title : plat.title
    })

    await plat.save()

    res.json({
        message: 'Plataforma modificada exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { id } = req.body

    const plat = await Platform.findById(id)

    if (!plat) throw "No se pudo encontrar una plataforma con este ID."

    plat.set({
        is_deleted: true
    })

    plat.save()

    res.json({
        message: 'Plataforma eliminada exitosamente!'
    })
    
}