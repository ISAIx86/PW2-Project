const mongoose = require('mongoose')
const User = mongoose.model('usuarios')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const uploader = require('../middlewares/uploader')
const fs = require('fs')
const date = require('date-and-time')

exports.login = async (req, res) => {

    const {
        email,
        password
    } = req.body

    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
        is_deleted: false
    })

    if (!user) throw "Correo o contraseña incorrectos."

    const token = await jwt.sign({id: user.id}, process.env.SECRET)

    res.json({
        message: "Bienvenido, " + user.username,
        token
    })

}

exports.login_mod = async (req, res) => {

    const {
        email,
        password
    } = req.body

    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
        is_deleted: false
    })

    if (!user.is_mod) throw "No estas autorizado para acceder a las funciones de Moderador!"

    if (!user) throw "Correo o contraseña incorrectos."

    const token = await jwt.sign({id: user.id}, process.env.MOD_SECRET)

    res.json({
        message: "Bienvenido, " + user.username,
        token
    })

}

exports.register = async (req, res) => {

    const {
        nombres,
        apellidos,
        username,
        fecha_nac,
        email,
        password,
        conf_password
    } = req.body

    const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/
    const usernameRegex = /^[a-z0-9._]*$/
    const namesRegex = /^[_A-z]*((-|\s)*[_A-z])*$/
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!])(?=.{6,})/

    if (!namesRegex.test(nombres)) throw "El nombre tiene caracteres inválidos."
    if (!namesRegex.test(apellidos)) throw "El apellido tiene caracteres inválidos."
    if (!dateRegex.test(fecha_nac)) throw "La fecha viene en formato inválido."
    if (!emailRegex.test(email)) throw "El correo no es soportado o no tiene formato correcto."
    if (!usernameRegex.test(username)) throw "El nombre de usuario no es válido. No se admiten espacios ni mayúsculas."
    if (!passwordRegex.test(password)) throw "La contraseña viene en formato inválido."

    if (password === '') throw "La contraseña es requerida."
    if (password !== conf_password) throw "La confirmación de contraseña no coincide."

    const user = new User({
        nombres,
        apellidos,
        username,
        fecha_nac,
        email,
        password: sha256(password + process.env.SALT)
    })

    if (req.files && req.files.image) {

        const filename = `${user.id}_${date.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}`

        const path = await uploader.uploadInDestiny(
            './storage/users_images',
            req.files.image,
            filename
        )

        if (fs.existsSync(path.final_path))
            user.setImage(path.new_filename)

    }

    await user.save()

    res.json({
        message: "Ya estas registrado, " + username + ". Disftuta tu navegación!"
    })

}

exports.update = async (req, res) => {

    const {
        nombres,
        apellidos,
        username,
        fecha_nac,
        email
    } = req.body

    const id = req.payload.id

    const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/
    const usernameRegex = /^[a-z0-9._]*$/
    if (!emailRegex.test(email)) throw "El correo no es soportado o no tiene formato correcto."
    if (!usernameRegex.test(username)) throw "El nombre de usuario no es válido. No se admiten espacios ni mayúsculas."

    const user_exists = await User.findOne({
        _id: {$ne: id},
        email
    })

    if (user_exists) throw "Ya existe un usuario con este correo."

    const user = await User.findOne({
        _id: id,
        is_deleted: false
    })

    if (!user) throw "No se pudo encontrar un usuario con ese ID."

    user.set({
        nombres,
        apellidos,
        username,
        fecha_nac,
        email
    })

    if (req.files && req.files.image) {

        const filename = `${user.id}_${date.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}`

        const path = await uploader.uploadInDestiny(
            './storage/users_images',
            req.files.image,
            filename
        )

        if (fs.existsSync(path.final_path))
            user.setImage(path.new_filename)

    }

    await user.save()

    res.json({
        message: "Datos actualizados."
    })

}