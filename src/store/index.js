import { createStore } from 'vuex'

export default createStore({
  state: {
    cartCount:0,
    identity:'',
    username:'',
  },
  getters: {

  },
  mutations: {
    addCarCount(state,payload){
      state.cartCount += payload.count
    },
    addIdentity(state){
      state.identity = 'user'
    },
    updateUserName(state, username){
      state.username = username
    }
  },
  actions: {
      updateCarCount(context){
        context.commit('addCarCount',{count:1})
      },
      Login(context,username){
        context.commit('addIdentity')
        context.commit('updateUserName',username)
      }
  }
  ,
  modules: {

  }
})
