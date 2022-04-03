<template>
  <div>
    <navbar-component v-slot:default>商品分类</navbar-component>
    <div id="main-box">
      <!--     tab选择卡-->
      <div class="order-tab">
        <van-tabs v-model:active="activeTab" class="tab-bar">
          <van-tab title="按价格排序"></van-tab>
          <van-tab title="按综合排序"></van-tab>
          <van-tab title="按销量排序"></van-tab>
        </van-tabs>
      </div>
      <!--   侧边框   -->
      <div class="left-menu">
        <van-sidebar v-model="active" class="sidebar">
          <van-sidebar-item title="前端"  />
          <van-sidebar-item title="后端" />
          <van-sidebar-item title="软件工程" />
        </van-sidebar>
      </div>
      <!--  商品列表    -->
      <div class="goods-list">
        <van-card
            num="20"
            price="32.00"
            desc="这里是商品的描述信息"
            title="细说PHP"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            @click="goDetail(1)"
        >
          <template #tags>
            <van-tag plain type="danger">新品</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" color="#ffBc00" @click.stop="handlerAddCart">加入购物车</van-button>
            <van-button size="mini" color="#ff0000">购买</van-button>
          </template>
        </van-card>
        <van-card
            num="20"
            price="32.00"
            desc="这里是商品的描述信息"
            title="细说PHP"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            @click="goDetail(2)"
        >
          <template #tags>
            <van-tag plain type="danger">新品</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" color="#ffBc00" @click.stop="handlerAddCart">加入购物车</van-button>
            <van-button size="mini" color="#ff0000">购买</van-button>
          </template>
        </van-card>
        <van-card
            num="20"
            price="32.00"
            desc="这里是商品的描述信息"
            title="细说PHP"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            @click="goDetail(3)">
          <template #tags>
            <van-tag plain type="danger">新品</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" color="#ffBc00" @click.stop="handlerAddCart">加入购物车</van-button>
            <van-button size="mini" color="#ff0000">购买</van-button>
          </template>
        </van-card>
        <van-card
            num="20"
            price="32.00"
            desc="这里是商品的描述信息"
            title="细说PHP"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            @click="goDetail(4)">
          <template #tags>
            <van-tag plain type="danger">新品</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" color="#ffBc00" @click.stop="handlerAddCart">加入购物车</van-button>
            <van-button size="mini" color="#ff0000">购买</van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";

export default {
  name: "CategoryView",
  components:{
    NavbarComponent
  },
  data(){
    return{
      active:0,
      activeTab:0
    }
  },
  methods:{
    goDetail(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    },
    handlerAddCart(){
      this.$store.dispatch('updateCarCount')
      this.$toast.success("添加成功")
    }
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
    left: 130px;
    z-index: 9;
    .tab-bar{
      height: 100%;
    }
  }

  .left-menu{
    position: fixed;
    left: 0px;
    width: 130px;
    top: 95px;
    .sidebar{
      width: 100%;
    }
  }

  .goods-list{
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0px;
    height: 100vh;
    padding: 10px;
  }
}
</style>