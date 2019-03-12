import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//状态管理有5个核心，分别是state、getter、mutation、action以及module
//可设置全局对象
//父组件通过调用action对store里面数据进行了处理，他的子组件只要调用getter就可以获取到父组件处理后的数据
const store = new Vuex.Store({
    state: {    	//存放后端传过来的原生数据
        //是否需要强制登录
        forcedLogin: false,
        hasLogin: false,
        userName: ""
    },
    mutations: {   //用于处理同步数据修改
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    },
	getter:{    //后端传过来的数据，如果需要做一些处理就在getter里面写
		
	},
	action:{	//和mutatation功能是类似的，都是修改state里面的数据，区别是action用于异步修改
		
	}
})

export default store
