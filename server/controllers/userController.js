const mongoose = require('mongoose')
const User = mongoose.model('usuarios')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const Regex = require('../handlers/regex')

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

    if (!Regex.passwords.test(password)) throw "La contraseña tiene formato no válido."
    if (password !== conf_password) throw "La confirmación de contraseña no coincide."

    const user = new User({
        nombres,
        apellidos,
        username,
        fecha_nac,
        email,
        password: sha256(password + process.env.SALT)
    })

    await user.validate()

    if (req.files && req.files.image)
        await user.uploadImage(req.files.image)

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

    await user.validate()

    if (req.files && req.files.image)
        await user.uploadImage(req.files.image)

    await user.save()

    res.json({
        message: "Datos actualizados."
    })

}