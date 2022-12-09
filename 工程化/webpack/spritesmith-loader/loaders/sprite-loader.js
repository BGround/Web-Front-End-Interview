const fs = require('fs')
const path = require('path')

module.exports = function(source) {
    const callBack = this.async();
    const imgs = source.match(/url\((\S*)\?__sprite/g);
    const matchedImgs = [];

    for(let i = 0; i < imgs.length; i++) {
        const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
        matchedImgs.push(path.join(__dirname, img));
    }

}