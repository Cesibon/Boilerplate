const {
    User
  } = require('@app/database/models')

  const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (!token) {
            res.status(401)
            throw new Error('Bearer token missing!')
        }

        const payload = jwt.verify(token, process.env.APP_SECRET)

        const user = await User.findByPk(payload.id)

        if (!user) {
            res.status(401)
            throw new Error('Invalid bearer token!')
        }
        req.self = user

        next()

    } catch (error) {
        next(error)
    }
}