const config = require('../config')
const uploader = require('../middlewares/uploader')
const fs = require('fs')
const mongoose = require('mongoose')
const errorMessages = require('../handlers/error-messages.json')

const classification_schema = new mongoose.Schema({
    title: {
        type: String,
        required: errorMessages.classif['required-name']
    },
    image: {
        type: String,
        required: errorMessages.classif['required-image']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: errorMessages.classif['required-author'],
        ref: 'usuarios'
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

classification_schema.methods.uploadImage = async function uploadImage (img_file) {

    const path = await uploader.uploadInDestiny(
        `./${config.directories.esrb_logos}`,
        img_file,
        this.id
    )
    if (fs.existsSync(path.final_path))
        this.setImage(path.new_filename)

}

classification_schema.methods.setImage = function setImage (filename) {
    this.image = filename
}

module.exports = mongoose.model('clasificaciones', classification_schema)