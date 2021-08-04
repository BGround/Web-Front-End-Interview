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
        return 0
    } else if(
        (playerAction === 'rock' && computerAction === 'scissor') ||
        (playerAction === 'rock' && computerAction === 'scissor') ||
        (playerAction === 'rock' && computerAction === 'scissor')
    ) {
        return -1
    } else {
        return 1
    }
}

