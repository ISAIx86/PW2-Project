const jwt = require('jwt-then')

exports.user = async (req, res, next) => {
    try{
        if (!req.headers.authorization) throw "Forbidden!!"
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, process.env.SECRET)
        req.payload = payload
        next()
    } catch(err) {
        res.status(401).json({
            message: "Forbidden X X X"
        })
    }
}

exports.moderator = async (req, res, next) => {
    try{
        if (!req.headers.authorization) throw "Forbidden!!"
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, process.env.MOD_SECRET)
        req.payload = payload
        next()
    } catch(err) {
        res.status(401).json({
            message: "Forbidden X X X"
        })
    }
}