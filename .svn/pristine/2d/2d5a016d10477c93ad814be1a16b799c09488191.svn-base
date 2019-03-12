import Vue from 'vue'
import App from './App'
import store from './store'
import Util from './common/util.js'	//通用函数  模块化的

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
	Util,
    ...App
})
app.$mount()
