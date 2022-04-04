<template>
  <div>
    <navbar-component>商品详情:{{$route.query.id}}</navbar-component>
    <img :src="src" alt="">
    <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
      >
        <template #tags>
          <van-tag plain type="danger">新品上市</van-tag>
        </template>
        <!-- <template #footer>
          <van-button size="mini" color="#ff8c00" @click="handleAddCart()">加入购物车</van-button>
          <van-button size="mini" color="#ff0000">购买</van-button>
        </template> -->
    </van-card>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" :badge='this.$store.state.cartCount' />
      <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
      <van-action-bar-button color="#5FB878" type="warning" text="加入购物车" />
      <van-action-bar-button color="#009688" type="danger" text="立即购买" />
    </van-action-bar>
    
    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"

export default {
  name: "DetailView",
  components:{
    NavbarComponent,
    TabBar
  },
  data(){
    return{
      src:''
    }
  },
  methods:{
    handleAddCart(){
      this.$store.dispatch('updateCartCount')
      this.$toast.success("添加成功")
    }
  },
  mounted(){
    this.src = 'swipe1.jpg'
  }
}
</script>

<style scoped lang="scss">
.van-card{
  text-align: left;
  font-size: var(--font-size)
}

.van-action-bar{
  margin-bottom: 50px;
}

</style>