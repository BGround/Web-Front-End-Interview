const { runLoaders } = require('loader-runner')
const fs = require('fs')
const path = require('path')

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
        path.join(__dirname, './src/raw-loader.js')
    ],
    context: {
        minimize: true
    },
    readSource: fs.readFileSync.bind(fs)
}, (err,result) => {
    err ? console.log(err) : console.log(result)
})
