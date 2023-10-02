const mongoose = require('mongoose')
const User = mongoose.model('usuarios')
const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const Regex = require('../handlers/regex')
const errorMessages = require('../handlers/error-messages.json')
const {sendResponse} = require('../handlers/answerHandler')

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

    if (user.password && !Regex.passwords.test(user.password)) throw errorMessages.users['bad-password']
    if (user.password !== conf_password) throw errorMessages.users['bad-confirmation']

    user.set({
        password: sha256(user.password + process.env.SALT)
    })

    if (req.files && req.files.image)
        await user.uploadImage(req.files.image)

    await user.save()

    sendResponse(res, "Ya estas registrado, " + username + ". ¡Disftuta tu navegación!")

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
    if (!user) throw errorMessages.users['id-not-found']

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

    sendResponse(res, "Datos actualizados.")

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
    if (!user) throw errorMessages.users['id-not-found']

    if (sha256(password + process.env.SALT) !== user.password) throw errorMessages.users['wrong-actual-password']
    if (!Regex.passwords.test(new_password)) throw errorMessages.users['bad-new-password']
    if (new_password !== conf_password) throw errorMessages.users['bad-confirmation']

    user.set({
        password: sha256(new_password + process.env.SALT)
    })

    await user.save()

    sendResponse(res, "Contraseña actualizada exitosamente.")

}

exports.closeProfile = async (req, res) => {

    const id = req.payload.id

    const user = await User.findOne({
        _id: id,
        is_deleted: false
    })
    if (!user) throw errorMessages.users['id-not-found']

    user.set({
        is_deleted: true
    })

    await user.save()

    sendResponse(res, "Perfil cerrado exitosamente.")

}

exports.follow = async (req, res) => {

    const { target_id } = req.body
    const id = req.payload.id

    if (target_id === id) throw errorMessages.users['follow-itself']

    const target_user = await User
        .findOne({_id: target_id, is_deleted: false})
    const user = await User
        .findOne({_id: id, is_deleted: false})
    if (!user) throw errorMessages.users['id-not-found']
    if (!target_user) throw errorMessages.users['follow-target-not-found']

    if (target_user.is_private) {
        if (target_user.followers.includes(user.id)) throw errorMessages.users['already-follow']
        if (user.following.includes(target_user.id)) throw errorMessages.users['already-follow']
        if (!target_user.requests.includes(user.id))
            await User.updateOne(
                {_id: target_user.id},
                {$push: {requests: user.id}}
            )
    } else {
        if (!target_user.followers.includes(user.id))
            await User.updateOne(
                {_id: target_user.id},
                {$push: {followers: user.id}}
            )
        if (target_user.requests.includes(user.id))
            await User.updateOne(
                {_id: target_user.id},
                {$pull: {requests: user.id}}
            )
        if (!user.following.includes(target_user.id))
            await User.updateOne(
                {_id: user.id},
                {$push: {following: target_user.id}}
            )
        if (target_user.followers.includes(user.id)) throw errorMessages.users['already-follow']
        if (user.following.includes(target_user.id)) throw errorMessages.users['already-follow']
    }

    sendResponse(res, target_user.is_private ? "Solicitud de seguimiento enviada." : "Seguimiento exitoso.")

}

exports.acceptFollower = async (req, res) => {

    const { req_id } = req.body
    const id = req.payload.id

    if (req_id === id) throw errorMessages.users['follow-itself']

    const requester = await User
        .findOne({_id: req_id, is_deleted: false})
    const user = await User
        .findOne({_id: id, is_deleted: false})
    if (!user) throw errorMessages.users['id-not-found']
    if (!requester) throw errorMessages.users['requester-not-found']
    
    if (!user.requests.includes(requester.id)) throw errorMessages.users['not-found-in-req-list']
    if (!user.followers.includes(requester.id))
        await User.updateOne(
            {_id: user.id},
            {$push: {followers: requester.id}}
        )
    if (user.requests.includes(requester.id))
        await User.updateOne(
            {_id: user.id},
            {$pull: {requests: requester.id}}
        )
    if (!requester.following.includes(user.id))
        await User.updateOne(
            {_id: requester.id},
            {$push: {following: user.id}}
        )

    sendResponse(res, "Petición aceptada exitosamente.")

}

exports.unfollow = async (req, res) => {

    const { target_id } = req.body
    const id = req.payload.id

    const target_user = await User
        .findOne({_id: target_id, is_deleted: false})
    const user = await User
        .findOne({_id: id, is_deleted: false})
    if (!user) throw errorMessages.users['id-not-found']
    if (!target_user) throw errorMessages.users['unfollow-target-not-found']

    if (target_user.followers.includes(user.id))
        await User.updateOne(
            {_id: target_user.id},
            {$pull: {followers: user.id}}
        )
    if (user.following.includes(target_user.id))
        await User.updateOne(
            {_id: user.id},
            {$pull: {following: target_user.id}}
        )

    if (!target_user.followers.includes(user.id)) throw errorMessages.users['already-unfollow']
    if (!user.following.includes(target_user.id)) throw errorMessages.users['already-unfollow']

    sendResponse(res, "Se dejó de seguir al usuario.")

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
    if (!user) throw errorMessages.users['wrong-password']

    const token = await jwt.sign({id: user.id}, process.env.SECRET)

    sendResponse(
        res,
        {
            message: "Bienvenido, " + user.username,
            token
        }
    )

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
    if (!user) throw errorMessages.users['wrong-password']
    if (!user.is_mod) throw errorMessages.users['unauthorized-mod']

    const token = await jwt.sign({id: user.id}, process.env.MOD_SECRET)

    sendResponse(
        res,
        {
            message: "Bienvenido, " + user.username,
            token
        }
    )

}

exports.profile = async (req, res) => {

    const { _username } = req.params
    const id = req.payload.id

    let filters = null
    if (typeof _username === 'undefined') 
        filters = {_id: id, is_deleted: false}
    else
        filters = {username: _username, is_deleted: false}
    
    const result = await User
        .findOne(
            filters,
            {
                image: 1,
                _username: 1,
                descrip: 1,
                is_private: 1,
                is_following: {$in: [{$toObjectId: id},'$followers']},
                nombres: {$cond: [
                    {$or: [
                        {$eq: ['$_id', {$toObjectId: id}]},
                        {$ne: ['$is_private', true]},
                        {$eq: [typeof _username, 'undefined']}
                    ]},
                    '$nombres', '$$REMOVE'
                ]},
                apellidos: {$cond: [
                    {$or: [
                        {$eq: ['$_id', {$toObjectId: id}]},
                        {$ne: ['$is_private', true]},
                        {$eq: [typeof _username, 'undefined']}
                    ]},
                    '$apellidos', '$$REMOVE'
                ]}
            }
        )
    if (!result) throw errorMessages.users['not-found']

    sendResponse(res, {message: "Encontrado", result})

}

exports.searchUsername = async (req, res) => {

    const { text_input } = req.body
    const id = req.payload.id

    const results = await User
        .find(
            {username: {$regex: `.*${text_input}.*`}, is_deleted: false},
            {
                image:1, username:1, descrip:1,
                is_following: {$in: [{$toObjectId: id}, "$followers"]}
            }
        )

    sendResponse(res, results)

}

exports.requests = async (req, res) => {

    const id = req.payload.id

    const user = await User
        .findOne(
            {_id: id, is_deleted: false},
            {requests:1}
        )
        .populate('requests', 'image username descrip')
    if (!user) throw errorMessages.users['id-not-found']

    sendResponse(res, {results: user.requests})

}