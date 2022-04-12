const bcrypt = require('bcrypt')

exports.generateHash = function (plainText) {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedString = bcrypt.hashSync(plainText, salt)
        return hashedString
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

exports.compareHash = function (plainText, hash) {
    return bcrypt.compareSync(plainText, hash)
}