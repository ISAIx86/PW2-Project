const mongoose = require('mongoose')
const User = mongoose.model('usuarios')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const Regex = require('../handlers/regex')

// Create
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

    const user = new User({
        nombres,
        apellidos,
        username,
        fecha_nac,
        email,
        password
    })

    await user.validate()

    if (user.password && !Regex.passwords.test(user.password)) throw "La contraseña tiene formato no válido."
    if (user.password !== conf_password) throw "La confirmación de contraseña no coincide."

    user.set({
        password: sha256(user.password + process.env.SALT)
    })

    if (req.files && req.files.image)
        await user.uploadImage(req.files.image)

    await user.save()

    res.json({
        message: "Ya estas registrado, " + username + ". Disftuta tu navegación!"
    })

}

// Updates
exports.update = async (req, res) => {

    const {
        nombres,
        apellidos,
        username,
        fecha_nac,
        email,
        descrip,
        privacy,
        default_img
    } = req.body
    const id = req.payload.id

    const user = await User.findOne({
        _id: id,
        is_deleted: false
    })
    if (!user) throw "No se pudo encontrar un usuario con ese ID."

    user.set({
        nombres: typeof nombres !== 'undefined' ? nombres : user.nombres,
        apellidos: typeof apellidos !== 'undefined' ? apellidos : user.apellidos,
        username: typeof username !== 'undefined' ? username : user.username,
        fecha_nac: typeof fecha_nac !== 'undefined' ? fecha_nac : user.fecha_nac,
        email: typeof email !== 'undefined' ? email : user.email,
        descrip: typeof descrip !== 'undefined' && descrip !== '' ? descrip : undefined,
        is_private: typeof privacy !== 'undefined' && privacy ? privacy : user.is_private
    })

    await user.validate()
    
    if (typeof default_img !== 'undefined' && default_img.toLowerCase() === 'true')
        user.image = undefined
    else if (req.files && req.files.image)
        await user.uploadImage(req.files.image)

    await user.save()

    res.json({
        message: "Datos actualizados."
    })

}

exports.changePassword = async (req, res) => {

    const {
        password,
        new_password,
        conf_password
    } = req.body
    const id = req.payload.id

    const user = await User.findOne({
        _id: id,
        is_deleted: false
    })
    if (!user) throw "No se pudo encontrar un usuario con ese ID."

    if (sha256(password + process.env.SALT) !== user.password) throw "La contraseña acutal es incorrecta."
    if (!Regex.passwords.test(new_password)) throw "La contraseña nueva tiene formato no válido."
    if (new_password !== conf_password) throw "La confirmación de contraseña no coincide."

    user.set({
        password: sha256(new_password + process.env.SALT)
    })

    await user.save()

    res.json({
        message: "Contraseña actualizada exitosamente!"
    })

}

exports.closeProfile = async (req, res) => {

    const id = req.payload.id

    const user = await User.findOne({
        _id: id,
        is_deleted: false
    })
    if (!user) throw "No se pudo encontrar un usuario con ese ID."

    user.set({
        is_deleted: true
    })

    await user.save()

    res.json({
        message: "Perfil cerrado exitosamente!"
    })

}

// Queries
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

exports.loginMod = async (req, res) => {

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
    if (!user.is_mod) throw "No estas autorizado para acceder a las funciones de Moderador!"

    const token = await jwt.sign({id: user.id}, process.env.MOD_SECRET)

    res.json({
        message: "Bienvenido, " + user.username,
        token
    })

}

exports.profile = async (req, res) => {

    const username = req.params._username
    const id = req.payload.id

    let filters = null
    if (typeof username === 'undefined') 
        filters = {_id: id, is_deleted: false}
    else
        filters = {username, is_deleted: false}
    
    const result = await User
        .findOne(
            filters,
            {
                image: 1,
                username: 1,
                descrip: 1,
                is_private: 1,
                nombres: {$cond: [
                    {$or: [
                        {$eq: ['$_id', {$toObjectId: id}]},
                        {$ne: ['$is_private', true]},
                        {$eq: [typeof username, 'undefined']}
                    ]},
                    '$nombres', '$$REMOVE'
                ]},
                apellidos: {$cond: [
                    {$or: [
                        {$eq: ['$_id', {$toObjectId: id}]},
                        {$ne: ['$is_private', true]},
                        {$eq: [typeof username, 'undefined']}
                    ]},
                    '$apellidos', '$$REMOVE'
                ]}
            }
        )
    if (!result) throw "No pude encontrar a este usuario."

    res.json({
        message: 'Encontrado',
        result
    })

}

exports.searchUsername = async (req, res) => {

    const { text_input } = req.body

    const results = await User
        .find(
            {username: {$regex: `.*${text_input}.*`}},
            {image:1, username:1, descrip:1}
        )

    res.json({
        results
    })

}