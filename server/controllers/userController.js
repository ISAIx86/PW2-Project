const mongoose = require('mongoose')
const User = mongoose.model('Usuarios')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')

exports.login = async (req, res) => {

    const {
        email,
        password
    } = req.body

    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT)
    })

    if (!user) throw "Correo o contraseña incorrectos."

    const token = await jwt.sign({id: user.id}, process.env.SECRET)

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

    if (!emailRegex.test(email)) throw "El correo no es soportado o no tiene formato correcto."
    if (password === '') throw "La contraseña es requerida."
    if (password.length > 6) throw "La contraseña debe ser de menos de 6 caracteres."
    if (password !== conf_password) throw "La confirmación de contraseña no coincide."

    const userExists = await User.findOne({
        email
    })

    if (userExists) throw "Ya existe un usuario con este correo."

    const user = new User({
        nombres,
        apellidos,
        username,
        fecha_nac,
        email,
        password: sha256(password + process.env.SALT)
    })

    if (req.files) {
        const file = req.files.image
        const extension = file.name.split('.').pop()
        const new_filename = `user_${user.id}.${extension}`
        user.setImage(new_filename)
        file.mv(`./storage/users_images/${new_filename}`, (err, result) => {
            if (err) throw err;
        })
    }

    await user.save()

    res.json({
        message: "Ya estas registrado, " + username + ". Disftuta tu navegación!"
    })

}