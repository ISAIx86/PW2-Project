const mongoose = require('mongoose')
const Genre = mongoose.model('generos')

// Create
exports.create = async (req, res) => {

    const {
        title
    } = req.body

    const genre = new Genre({
        title,
        created_by: req.payload.id
    })

    await genre.save()

    res.json({
        message: 'Género creado exitosamente!'
    })

}

// Updates
exports.modify = async (req, res) => {

    const {
        genID,
        title
    } = req.body

    const genre = await Genre.findOne({
        _id: genID,
        is_deleted: false
    })

    if (!genre) throw "No se pudo encontrar un género con este ID"

    genre.set({
        title: typeof title !== 'undefined' ? title : genre.title
    })

    await genre.save()

    res.json({
        message: 'Género modificado exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { genID } = req.body

    const genre = await Genre.findById(genID)

    if (!genre) throw "No se pudo encontrar un género con este ID."

    genre.set({
        is_deleted: true
    })

    genre.save()

    res.json({
        message: 'Género eliminado exitosamente!'
    })
    
}

// Queries
exports.searchByTitle = async (req, res) => {

    const { text_input } = req.body
    
    const results = await Genre
        .find(
            {title: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {title: 1}
        )

    res.json({
        results
    })

}

exports.getById = async (req, res) => {

    const _genre_id = req.params._genre_id

    const result = await Genre
        .find(
            {_id: _genre_id, is_deleted: false},
            {title: 1, created_by: 1}
        )
        .populate('created_by', 'image username')
    if (!result) throw  "No se pudo encontrar un género con este ID."

    res.json({
        result
    })

}