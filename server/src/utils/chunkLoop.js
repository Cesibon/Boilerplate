module.exports = function (array, chunkSize, callback) {
    const chunk = chunkSize || 10 // items per chunk    

    for (let i = 0, j = array.length; i < j; i += chunk) {
        callback(array.slice(i, i + chunk))
        // do whatever
    }
}