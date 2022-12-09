module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    rule: {
        'linebreak-style': ["error", "windows"], // 声明这是windows操作系统即可,解决LF CRLF问题。
    }

};