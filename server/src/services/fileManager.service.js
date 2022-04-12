const fs = require('fs')
const path = require('path')

const dirTree = require("directory-tree");

module.exports = class FileManager {

    
    static BASE_PATH = process.env.BASE_PATH || path.resolve(__dirname, '../projects/')

    _PATH = {}

    constructor(project){
        this.project = project
        this.BASE_PATH = this.getProjectPath()
    }

    // File manager logic

}