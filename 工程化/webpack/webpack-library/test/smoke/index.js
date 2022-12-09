const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const { stats } = require('../../lib/webpack.base');

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod.js');

    webpack(prodConfig, (err, stats) => {
        if(err) {
            console.log(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            module: false,
            children: false
        }));
    })
});