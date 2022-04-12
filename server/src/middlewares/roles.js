
module.exports.isAdmin = async function (req, res, next) {
    try {

        if (!req?.user?.isAdmin) {
            res.status(403)
            throw new Error('Access forbidden!')
        }
        next()

    } catch (error) {
        next(error)
    }
}