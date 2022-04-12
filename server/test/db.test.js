const db = require('../src/database')

db.createProjectDatabase('TEST').then((connection) => {
    console.log('db created')
    connection.authenticate().then(() => {
        console.log('db connected')
        db.deleteProjectDatabase('TEST').then(() => {
            console.log('db deleted')
        })
    }).catch((error) => {
        console.error(error)
    })
})