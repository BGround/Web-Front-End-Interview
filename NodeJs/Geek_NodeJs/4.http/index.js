
/**
*   node 模块中http学习
*   创建一个http服务，输出index.html文件中内容
 */

const http = require('http')
const fs = require('fs')

http
    .createServer(function (req, res) {
        //一个默认的接口http://localhost:4000/favicon.ico，网站图标接口
        if (req.url == '/favicon.ico') {
            res.writeHead(200);
            res.end();
            return ;
        }
        console.log(req.url)
        res.writeHead(200)
        // res.end('hello')
        fs.createReadStream(__dirname + '/index.html')
            .pipe(res)
    })
    .listen(3000)