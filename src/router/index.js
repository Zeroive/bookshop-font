import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
const routes = [
  {
    path: '/',
    name: 'login',
    component:()=>import('../components/common/Login'),
    meta:{
      title:'登录',
      identities:['','user']
    }
  },
  {
    path: '/register',
    name:'defaultPage',
    component:()=>import('../components/common/Register'),
    meta:{
      title:'登录',
      identities:['','user']
    }
  },
  {
    path: '/address',
    name: 'address',
    component:()=>import('../views/address/address'),
    meta:{
      title:'地址管理',
      identities:['','user']
    }
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('../views/home/HomeView.vue'),
    meta:{
      title:'首页',
      identities:['user']
    }
  },
  {
    path:'/cart',
    name:'cart',
    component:()=>import('../views/cart/CartView.vue'),
    meta:{
      title:'购物车',
      identities:['user']
    }
  },
  {
    path:'/category',
    name:'category',
    component:()=>import('../views/category/CategoryView.vue'),
    meta:{
      title:'商品分类',
      identities:['user']
    }
  },
  {
    path:'/detail',
    name:'detail',
    component:()=>import('../views/detail/DetailView.vue'),
    meta:{
      title:'商品详情',
      identities:['user']
    }
  },
  {
    path:'/profile',
    name:'profile',
    component:()=>import('../views/profile/ProfileView.vue'),
    meta:{
      title:'我的',
      identities:['user']
    }
  },
  {
    path:'/myorder',
    name:'myorder',
    component:()=>import('../views/myOrder/myOrder.vue'),
    meta:{
      title:'我的订单',
      identities:['user']
    }
  },
  {
    path:'/collection',
    name:'collection',
    component:()=>import('../views/collection/collection.vue'),
    meta:{
      title:'我的收藏',
      identities:['user']
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  if (!to.meta.identities.includes(store.state.identity)){
    next({path:'/'})

  }else{
    document.title = to.meta.title
    next()
  }
})
export default router
