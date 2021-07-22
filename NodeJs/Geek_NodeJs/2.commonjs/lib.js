module.exports = function(playerAction) {

    const random = Math.random() * 3
    
    var computerAction = ''
    
    if(random < 1) {
        computerAction = 'rock'
    } else if(random > 2) {
        computerAction = 'paper'
    } else {
        computerAction = 'scissor'
    }
    console.log('我出了' + computerAction)
    if(playerAction == computerAction) {
        console.log('平局')
        return 0
    } else if(
        (playerAction === 'rock' && computerAction === 'scissor') ||
        (playerAction === 'rock' && computerAction === 'scissor') ||
        (playerAction === 'rock' && computerAction === 'scissor')
    ) {
        console.log('你赢了')
        return -1
    } else {
        console.log('你输了')
        return 1
    }
}

