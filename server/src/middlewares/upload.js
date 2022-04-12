const multer = require('multer');
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.base_path ? req.base_path : path.join(__dirname, '../tmp/')
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true})
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
})

module.exports = upload

module.exports.uploadWithName = multer(storage)

module.exports.basePathMiddleware = async (req, res, next) => {
    try {
        let artifact = [
            __dirname,
            '../projects/'
        ]
        if(req.project) artifact.push(req.project.name)
        if(req.system) artifact.push('/systems/',req.system.id.toString())

        const folder = path.join(...artifact)
        
        req.base_path = folder
        next()
    } catch (error) {
        next(error)
    }
}

module.exports.basePathUploadFile = (fieldname, folderName, filename) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const base_path = req.base_path ? req.base_path : path.join(__dirname, '../tmp/')
            const folder = path.join(base_path, folderName)
            if (!fs.existsSync(folder)) fs.mkdirSync(folder, {
                recursive: true
            })
            cb(null, folder)
        },
        filename: function (req, file, cb) {
            cb(null, filename || file.originalname)
        }
    })

    const upload = multer({
        storage
    })

    return upload.single(fieldname)
}

module.exports.basePathUploadFiles = (fieldname, folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const base_path = req.base_path ? req.base_path : path.join(__dirname, '../tmp/')
            const folder = path.join(base_path, folderName)
            if (!fs.existsSync(folder)) fs.mkdirSync(folder, {
                recursive: true
            })
            cb(null, folder)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

    const upload = multer({
        storage
    })

    return upload.array(fieldname)
}