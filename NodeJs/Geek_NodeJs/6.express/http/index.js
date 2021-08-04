/**
*   express实现
*   网页版剪刀石头布小游戏
 */

const http = require('http');
const fs = require('fs');
//  const {URL} = require('url');
const url = require('url');
const querystring = require('querystring');
const game = require('./game');
const express = require('express');

const app = express();

let playerWonCount = 0;      /* 用户赢的次数 */

let playerLastAction;   /* 用户上次出的动作 */
let sameCount = 0;      /* 用户连续出同样动作的次数 */

app.get('/favicon.ico', function(req, res) {
    // res.writeHead(200);
    // res.end();
    res.status(200)
    return;
})

app.get('/game', 

    function(req, res, next) {
        if(playerWonCount >= 3 || sameCount === 9) {
            res.status(500);
            res.send('我再也不和你玩了！');
            return;
        }

        next();

        if(res.playerWon) {
            playerWonCount++ ;
        }
    },

    function(req, res, next) {
        // const parseUrl = url.parse(req.url);
        // const query = querystring.parse(parseUrl.query);
        //query可以直接从req中取，不需要再做转换
        const query = req.query;

        const playerAction = query.action;

        if(playerAction && playerAction === playerLastAction) {
            sameCount ++;
        } else {
            sameCount = 0;
        }
        
        if(sameCount >= 3) {
            res.status(400);
            res.send('你作弊！');
            sameCount = 9;
            return;
        }
        playerLastAction = playerAction;

        res.playerAction = playerAction;
        next();
    },

    function(req, res) {
        playerAction = res.playerAction;
        const gameResult = game(playerAction);

        res.status(200);
        if( gameResult === 0) {
            res.send('平局');
        } else if(gameResult === 1) {
            res.send('你赢了');
            res.playerWon= true;
        } else {
            res.send('你输了');
        }
    }
)

app.get('/', function(req, res) {
    // ??? 这样写有问题，导致会直接下载
    // res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
    res.writeHead(200);
    fs.createReadStream(__dirname + '/index.html').pipe(res)
})

app.listen(3000);


