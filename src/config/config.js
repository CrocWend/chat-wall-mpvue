var online = {
    "environmentName": "生产环境",
    "environment": "online",
    "port": "10000",
    "host": "",
    "socketUrl": "wss://chat.llllll.xyz/socket.io",
    "apiUrl": "https://chat.llllll.xyz",
    "uploadPicUrl": "https://api.berryapi.net/sina",
    "showVoicePart": "false",
};

var local = {
    "environmentName": "本地部署环境",
    "environment": "local",
    "host": "127.0.0.1",
    "port": "10000", //本地公网端口
    "socketUrl": "wss://127.0.0.1:10000",
    "apiUrl": "https://127.0.0.1:10000",
    "uploadPicUrl": "https://api.berryapi.net/sina",
    "showVoicePart": "false",
};

// module.exports = local;
module.exports = online;


