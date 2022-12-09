if (typeof window === 'undefined') {
    global.window = {};
}

const express = require('express');
const {renderToString} = require('react-dom/server');
const SSR = require('../dist/search-server.js');

const server = (port) => {
    const app = express(); // 实例化express

    app.use(express.static('dist')); // 设置静态目录
    const html = renderMarkup(renderToString(SSR));
    app.get('/search', (req, res) => {
        res.status(200).send(html)
    });

    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    })

}

server(process.env.port || 3000);


const renderMarkup = (str) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id='root'>${str}</div>
    </body>
    </html>`
};


