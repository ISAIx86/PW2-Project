const mongoose = require('mongoose')
const Classification = mongoose.model('clasificaciones')

// Create
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

// Updates
exports.modify = async (req, res) => {

    const {
        clID,
        title
    } = req.body

    const curr_class = await Classification.findOne({
        _id: clID,
        is_deleted: false
    })

    if (!curr_class) throw "No se pudo encontrar una clasificación con ese ID."

    curr_class.set({
        title: typeof title !== 'undefined' ? title : curr_class.title
    })

    if (req.files && req.files.image)
        await curr_class.uploadImage(req.files.image)

    await curr_class.save()

    res.json({
        message: 'Clasificación modificada exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { clID } = req.body

    const curr_class = await Classification.findById(clID)

    if (!curr_class) throw "No se pudo encontrar una clasificación con ese ID."

    curr_class.set({
        is_deleted: true
    })

    curr_class.save()

    res.json({
        message: 'Clasificación eliminada exitosamente!'
    })

}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body
    
    const results = await Classification
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {image:1, title:1}
        )

    res.json({
        results
    })

}

exports.getById = async (req, res) => {

    const _class_id = req.params._class_id

    const result = await Classification
        .find(
            {_id: _class_id, is_deleted: false},
            {title: 1, image: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!result) throw  "No se pudo encontrar una clasificación con este ID."

    res.json({
        result
    })

}