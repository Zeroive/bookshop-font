<template>
  <div>
    <navbar-component>商品分类</navbar-component>
    <div id="main-box">

      <!--   侧边框   -->
      <div class="left-menu">
        <van-sidebar v-model="active" class="sidebar"  @change="onChangeSideBar">
          <van-sidebar-item v-for="(item, index) in categories" :key="index" :title="item.name"  />
        </van-sidebar>
      </div>

      <!--  商品列表    -->
      <div class="goods-list">
        <!-- for循环渲染商品卡片 -->
        <van-card
            v-for="(item,index) in goodsByCategory" :key="index"
            :price="item.price.toFixed(2)"
            :title="item.name"
            :thumb="item.imgUrl"
            @click="goDetail(item.id)"
        >
          <template #tags>
            <van-tag plain type="danger">新品</van-tag>
          </template>
        </van-card>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'

export default {
  name: "CategoryView",
  components:{
    NavbarComponent,
    TabBar
  },
  data(){
    return{
      active: 0, //当期选择的类别
      categories: [], //所有商品类别
      goodsByCategory: [] //当前类别的商品列表
    }
  },
  methods:{
    // 去商品详情页
    goDetail(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    },
    // 添加购物车
    handlerAddCart(){
      this.$store.dispatch('updateCarCount')
      this.$toast.success("添加成功")
    },
    // 获取请求
    getRequest(url, data, func=null){
      request({
        url: url,
        method: "post",
        data: data
      }).then(res=>{
        if(res != null && res.code == 200){
          func(res.data)
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    // 改变侧标签栏
    onChangeSideBar(){
      this.getRequest(
        "/goods/queryGoodsByCategory",
        {id: this.categories[this.active].id},
        (data)=>{this.goodsByCategory = data;}
      )
    }
  },
  mounted(){
    // 请求商品类别
    this.getRequest(
      "/category/all",
      {},
      (data)=>{
        this.categories = data
        this.onChangeSideBar()
      }
    )
  }
}
</script>

<style scoped lang="scss">
#main-box{
  margin-top: 45px;
  display: flex;

  .order-tab{
    flex: 1;
    height: 50px;
    position: fixed;
    top: 45px;
    right: 0;
    left: 80px;
    z-index: 9;
    .tab-bar{
      height: 100%;
    }
  }

  .left-menu{
    position: fixed;
    left: 0px;
    width: 80px;
    .sidebar{
      width: 100%;
    }
  }

  .goods-list{
    flex: 1;
    position: absolute;
    left: 80px;
    right: 0px;
    height: 100vh;
    padding: 10px;
  }
}
</style>