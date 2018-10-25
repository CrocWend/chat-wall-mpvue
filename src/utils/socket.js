import Vue from "vue";

class socket {
    constructor(host) {
        this.instance = null;
        this.host = host
        this.userInfo = Vue.prototype.$store.state.userInfo
        this.connected = false
        // 监听连接成功 发送一条消息 标识用户
        wx.onSocketOpen((res) => {
            console.log('WebSocket连接已打开！')
            this.connected = true
            wx.sendSocketMessage({
                data: JSON.stringify({
                    user: this.userInfo,
                    messageType: 'JOIN',
                })
            })
        })

        // 监听连接断开
        wx.onSocketError((res) => {
            console.log('WebSocket连接打开失败，请检查！')
            this.connected = false
            wx.connectSocket({
                url: this.host
            })
        })

        // 监听连接关闭
        wx.onSocketClose((res) => {
            console.log('WebSocket 已关闭！')
            this.connected = false
            wx.connectSocket({
                url: this.host
            })
        })

        return wx.connectSocket({
            url: this.host
        })
    }
    // 构造一个广为人知的接口，供用户对该类进行实例化
    static getSocket() {
        if (!this.instance) {
            this.instance = new socket('ws://localhost:8181');
        }
        return this.instance;
    }
    static sendMessage(data) {
        if (!this.connected) {
            console.log('not connected')
            return
        }
        wx.sendSocketMessage({
            data: JSON.stringify(data)
        })
    }



    onMessage(callback) {
        if (typeof (callback) != 'function')
            return
        // 监听服务器消息
        wx.onSocketMessage((res) => {
            const data = JSON.parse(res.data)
            console.log(res)
            callback(data)
        })
    }
}

export default socket