/**
*   node 模块中http学习
*   网页版剪刀石头布小游戏
 */

 const http = require('http');
 const fs = require('fs');
//  const {URL} = require('url');
const url = require('url');
const querystring = require('querystring');

const game = require('./game');

let playerWon = 0;

let playerLastAction;
let sameCount = 0;

 http
    .createServer(function(req, res) {
        // const parseUrl = new URL(`$(req.url)`, 'http://localhost:3000');
        const parseUrl = url.parse(req.url);

        if(parseUrl.pathname === '/favicon.ico') {
            res.writeHead(200);
            res.end();
            return;
        }

        /*
        *   这里获取query中action有两种方式
        *   1、 引入node中querystring包，再querystring.parse(parseUrl.query);
        *   2、 直接使用url.parse中第二个参数true获取query，但是url.parse已更改
        */
        if(parseUrl.pathname=== '/game') {
            const query = querystring.parse(parseUrl.query);
            // const urlObj = url.parse(req.url, true)
            // const playerAction = urlObj.query.action;

            const playerAction = query.action;

            if(playerWon >= 3 || sameCount === 9) {
                res.writeHead(500);
                res.end('我再也不和你玩了！');
                return;
            }

            if(playerAction && playerAction === playerLastAction) {
                sameCount ++;
            } else {
                sameCount = 0;
            }
            
            if(sameCount >= 3) {
                res.writeHead(400);
                res.end('你作弊！');
                sameCount = 9;
                return;
            }
            playerLastAction = playerAction;

            const gameResult = game(playerAction);

            res.writeHead(200);
            if( gameResult === 0) {
                res.end('平局');
            } else if(gameResult === 1) {
                res.end('你赢了');
                playerWon ++;
            } else {
                res.end('你输了');
            }
        }

        if(parseUrl.pathname === '/') {
            fs.createReadStream(__dirname + '/index.html').pipe(res)
        }
    })
    .listen(3000)