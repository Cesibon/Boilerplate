const {
    User,
    Project
} = require('@app/database/models')

exports.userMiddleware = async (req, res, next) => {
    try {
        const id = parseInt(req.params.userid)
        if (!id) {
            res.status(400)
            throw new Error('Invalid parameters!')
        }

        const user = await User.findByPk(id)

        if (!user) {
            res.status(404)
            throw new Error("User Not found.")
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

// GET request for list of all users.
exports.usersGet = async (req, res, next) => {
    try {
        const options = {
            offset: req.query.offset || null,
            limit: req.query.limit || null,
            order: [
                [req.query.orderby || 'id', req.query.direction || 'ASC']
            ]
        }
        const users = await User.findAll(options)
        res.json(users)
    } catch (error) {
        next(error)
    }
}

// GET request user.
exports.userGet = async (req, res, next) => {
    try {
        await req.user.getProjects();
        res.json(req.user)
    } catch (error) {
        next(error)
    }
}

// Handle user create.
exports.userCreate = async (req, res, next) => {
    try {
        const user = await User.scope('withPassword').create(req.body)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

// Handle user update.
exports.userUpdate = async (req, res, next) => {
    try {
        await req.user.update(req.body)

        res.json(req.user)
    } catch (error) {
        next(error)
    }
}

// Handle user delete.
exports.userDelete = async (req, res, next) => {
    try {
        await req.user.destroy()
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

// GET request for list of all users.
exports.userGetProjects = async (req, res, next) => {
    try {
        const users = await req.user.getProjects()
        res.json(users)
    } catch (error) {
        next(error)
    }
}