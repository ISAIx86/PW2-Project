const mongoose = require('mongoose')
const Classification = mongoose.model('clasificaciones')
const uploader = require('../middlewares/uploader')
const fs = require('fs')

exports.create = async (req, res) => {

    const {
        title
    } = req.body

    if (!req.files && !req.files.image) throw "Se requiere una imagen de Clasificación!"

    const new_class = new Classification({
        title,
        created_by: req.payload.id
    })

    const path = await uploader.uploadInDestiny(
        './resources/esrb_classifications',
        req.files.image,
        new_class.id
    )
    if (fs.existsSync(path.final_path))
        new_class.setImage(path.new_filename)

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

    if (req.files && req.files.image) {
        const path = await uploader.uploadInDestiny(
            './resources/esrb_classifications',
            req.files.image,
            curr_class.id
        )
        if (fs.existsSync(path.final_path))
            curr_class.setImage(path.new_filename)
    }

    await curr_class.save()

    res.json({
        message: 'Clasificación modificada exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { id } = req.body

    const curr_class = await Classification.findById(id)

    curr_class.set({
        is_deleted: true
    })

    curr_class.save()

    res.json({
        message: 'Clasificación eliminada exitosamente!'
    })

}