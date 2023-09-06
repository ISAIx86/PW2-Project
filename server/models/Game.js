const mongoose = require('mongoose')

const game_schema = new mongoose.Schema({
    titulo: {type: String, required: 'Se requiere el título.'},
    descrip: {type: String, required: 'Se requiere una descripción del juego.'},
    image: {type: String, required: 'Se requiere una imagen de título.'},
    cover: {type: String, required: 'Se requiere una imagen de portada.'},
    rating: {type: Number, default: 0.0},
    classification: {type: mongoose.Types.ObjectId, required: 'El juego debe estar clasificado.'},
    genre: [{type: mongoose.Types.ObjectId, ref: 'clasificaciones'}],
    developers: [{type: mongoose.Types.ObjectId, ref: 'desarrolladores'}],
    platforms: [{type: mongoose.Types.ObjectId, ref: 'plataformas'}],
    followers: [{type: mongoose.Types.ObjectId, ref: 'usuarios'}],
    is_deleted: {type: Boolean, default: false}
},{
    timestamps: true
})

game_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

game_schema.methods.setCover = function setCover (filename) {
    this.cover = filename
}

game_schema.methods.setRating = function setRating (value) {
    this.rating = value
}

module.exports = mongoose.model('juegos', game_schema)