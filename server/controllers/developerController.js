const mongoose = require('mongoose')
const Developer = mongoose.model('desarrolladores')

exports.create = async (req, res) => {

    const {
        title
    } = req.body

    const dev = new Developer({
        title,
        created_by: req.payload.id
    })

    await dev.save()

    res.json({
        message: 'Desarrollador añadida exitosamente!'
    })

}

exports.modify = async (req, res) => {

    const {
        id,
        title
    } = req.body

    const dev = await Developer.findOne({
        _id: id,
        is_deleted: false
    })

    if (!dev) throw "No se pudo encontrar un desarrollador con ese ID."

    dev.set({
        title
    })

    await dev.save()

    res.json({
        message: 'Desarrollador modificado exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { id } = req.body

    const dev = await Developer.findById(id)

    if (!dev) throw "No se pudo encontrar un desarrollador con ese ID."

    dev.set({
        is_deleted: true
    })

    dev.save()

    res.json({
        message: 'Desarrollador eliminado exitosamente!'
    })
    
}