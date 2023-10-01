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
        platID,
        title
    } = req.body

    const plat = await Platform.findOne({
        _id: platID,
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

    const { platID } = req.body

    const plat = await Platform.findById(platID)

    if (!plat) throw "No se pudo encontrar una plataforma con este ID."

    plat.set({
        is_deleted: true
    })

    plat.save()

    res.json({
        message: 'Plataforma eliminada exitosamente!'
    })
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body
    
    const results = await Platform
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )

    res.json({
        results
    })

}

exports.getById = async (req, res) => {

    const _plat_id = req.params._plat_id

    const result = await Platform
        .find(
            {_id: _plat_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!result) throw  "No se pudo encontrar una plataforma con este ID."

    res.json({
        result
    })

}