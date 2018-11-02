import App from './index'
import Vue from 'vue'

const app = new Vue(App)

app.$mount()

export default {
    config: {
        navigationBarTitleText: '首页授权',
        usingComponents: {
            "van-button": "/modules/vant-ui/button/index",
            "van-field": "/modules/vant-ui/field/index",
            "van-toast": "/modules/vant-ui/toast/index",
            "van-transition": "/modules/vant-ui/transition/index"
        },
    },
}