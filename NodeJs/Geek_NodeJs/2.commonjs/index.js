// const playerAction = process.argv[process.argv.length -1]

const game = require('./lib')
// game(playerAction)

/**
 * 设计一个人工智能小程序，计算电脑输三场之后自动结束游戏
 * count 计算次数
 * 
 */
let count = 0;
process.stdin.on('data', e => {
    const playerAction = e.toString().trim()
    const result = game(playerAction)
    if(result === -1) {
        ++count
    }
    if(count === 3) {
        console.log('你太厉害了，我不玩了！')
        process.exit()
    }
})


