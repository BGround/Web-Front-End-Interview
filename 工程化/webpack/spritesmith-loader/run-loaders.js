const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
    {
        resource: './loader/index.css',
        loaders: [path.resolve(__dirname, "./loaders/sprite-loader.js")],
        readResource: fs.readFile.bind(this)
    },
    (err, result) => {
        err ? console.error(err) : null
    }
);