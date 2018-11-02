var online = {
    "environmentName": "生产环境",
    "environment": "online",
    "port": "10000",
    "host": "",
    "socketUrl": "wss://chat.llllll.xyz/socket.io",
    "apiUrl": "https://chat.llllll.xyz",
};

var local = {
    "environmentName": "本地部署环境",
    "environment": "local",
    "port": "10000", //本地公网端口
    "host": "127.0.0.1",
    "socketUrl": "wss://127.0.0.1:10000",
    "apiUrl": "https://127.0.0.1:10000",
};

// module.exports = local;
module.exports = online;


