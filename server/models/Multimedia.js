const config = require('../config')
const mongoose = require('mongoose')
const uploader = require('../middlewares/uploader')
const fs = require('fs')
const date = require('date-and-time')
const errorMessages = require('../handlers/error-messages.json')

const multimedia_schema = new mongoose.Schema({
    directory: {
        type: String,
        required: errorMessages.multimedia['required-directory']
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: errorMessages.multimedia['required-author']
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
})

multimedia_schema.methods.upload = async function upload(post_id, index, multim) {

    const filename = `post_${post_id}_${index}_${date.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}`

    const path = await uploader.uploadInDestiny(
        `./${config.directories.multimedia}`,
        multim,
        filename
    )

    if (fs.existsSync(path.final_path))
        this.directory = path.new_filename
    else return false
    
    return true

}

module.exports = mongoose.model('multimedias', multimedia_schema)