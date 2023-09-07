const mongoose = require('mongoose')
const Genre = mongoose.model('generos')

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

exports.modify = async (req, res) => {

    const {
        id,
        title
    } = req.body

    const genre = await Genre.findeOne({
        _id: id,
        is_deleted: false
    })

    if (!genre) throw "No se pudo encontrar un género con este ID"

    genre.set({
        title
    })

    await genre.save()

    res.json({
        message: 'Género modificado exitosamente!'
    })

}

exports.delete = async (req, res) => {

    const { id } = req.body

    const genre = await Genre.findById(id)

    genre.set({
        is_deleted: true
    })

    genre.save()

    res.json({
        message: 'Género eliminado exitosamente!'
    })
    
}