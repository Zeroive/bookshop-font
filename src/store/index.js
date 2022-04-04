import { createStore } from 'vuex'

export default createStore({
  state: {
    identity:'user',
    user:{
      userName:'',
      userId: 104
    },
    cart: {
      goodlist: [],
      count: 0
    }
  },
  getters: {

  },
  mutations: {
    addCarCount(state,payload){
      state.cart.count += payload.count
    },
    addIdentity(state){
      state.identity = 'user'
    },
    updateUserName(state, userInfo){
      state.user = userInfo
    }
  },
  actions: {
    updateCarCount(context){
      context.commit('addCarCount',{count:1})
    },
    Login(context,userInfo){
      context.commit('addIdentity')
      context.commit('updateUserName',userInfo)
    }
  }
  ,
  modules: {

  }
})
