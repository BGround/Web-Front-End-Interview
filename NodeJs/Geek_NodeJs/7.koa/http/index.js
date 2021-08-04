/**
*   kao 实现
*   网页版剪刀石头布小游戏
 */

const fs = require('fs');
const game = require('./game');
const Koa = require('koa');
const mount = require('koa-mount');

const app = new Koa();

let playerWonCount = 0;      /* 用户赢的次数 */

let playerLastAction;   /* 用户上次出的动作 */
let sameCount = 0;      /* 用户连续出同样动作的次数 */

app.use(
    mount('/favicon.ico', function(ctx) {
        ctx.status = 200;
    })
)

const gameKoa = new Koa();

app.use(
    mount('/game', gameKoa)
)

gameKoa.use(
    async function(ctx, next) {
        if(playerWonCount >= 3 || sameCount === 9) {
            ctx.status = 500;
            ctx.body = '我再也不和你玩了！';
            return;
        }

        await next();

        if(ctx.playerWon) {
            playerWonCount++ ;
        }
    }
)

gameKoa.use(
    async function(ctx, next) {
        //query可以直接从req中取，不需要再做转换
        const query = ctx.query;

        const playerAction = query.action;

        if(playerAction && playerAction === playerLastAction) {
            sameCount ++;
        } else {
            sameCount = 0;
        }
        
        if(sameCount >= 3) {
            ctx.status = 400;
            ctx.body = '你作弊！';
            sameCount = 9;
            return;
        }
        playerLastAction = playerAction;

        ctx.playerAction = playerAction;
        await next();
    },
)

gameKoa.use(
    async function(ctx, next) {
        playerAction = ctx.playerAction;
        const gameResult = game(playerAction);

        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200;
                if( gameResult === 0) {
                    ctx.body = '平局';
                } else if(gameResult === 1) {
                    ctx.body = '你赢了';
                    ctx.playerWon = true;
                } else {
                    ctx.body = '你输了';
                }
                resolve();
            }, 500);
        })
    }
)

app.use(
    mount('/', function(ctx) {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
    })
)

app.listen(3000);


