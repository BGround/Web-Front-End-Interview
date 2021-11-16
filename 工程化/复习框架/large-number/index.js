if(process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/large-number-bground.min.js')
} else {
    module.exports = require('./dist/large-number-bground.js')
}