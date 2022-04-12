const {
    User
} = require('@app/database/models')

const {compareHash} = require('@app/utils/functions/hash')

const jwt = require("jsonwebtoken");

// GET request for auth user.
exports.handshake = async (req, res, next) => {
    try {
        res.json(req.self)
    } catch (error) {
        next(error)
    }
}

exports.signIn = async function (req, res, next) {
    try {
        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

        if (!(login && password)) {
            res.status(401)
            throw new Error('Credentials missing!')
        }

        const user = await User.scope('withPassword').findOne({
            where: {
                username: login
            }
        })

        if (!user) {
            res.status(401)
            throw new Error("Username incorrect!")
        }
        
        if (!compareHash(password, user.password)) {
            res.status(401)
            throw new Error('Invalid password!')
        }

        const payload = {
            id: user.id
        }

        const token = jwt.sign(payload, process.env.APP_SECRET);

        user.token = token;

        await user.save()

        res.send(token)
    } catch (error) {
        next(error);
    }
}

exports.signOut = async function (req, res, next) {
    try {
        await req.self.update({
            token: null
        })
        res.json({
            message: 'Signed out!'
        })
    } catch (error) {
        next(error)
    }
}

exports.kickOut = async function (req, res, next) {
    try {
        const token = req.params.token
        if (!token) {
            res.status(400)
            throw new Error('Invalid parameters!')
        }
        const user = await User.findOne({
            where: {
                token: token
            }
        })
        if (!user) throw new Error("User Not found.")
        await user.update({
            token: null
        })
        res.json({
            message: user.username + ' signed out!'
        })
    } catch (error) {
        next(error)
    }
}