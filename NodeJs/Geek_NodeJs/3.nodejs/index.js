/**
*promisr学习
*
 */


(function() {
    var promise = new Promise(function (resolve, rejected) {
        setTimeout(() => {
            resolve()
        }, 500);
    })


    console.log(promise);

    setTimeout(() => {
        console.log(promise)
    }, 800);
})()



