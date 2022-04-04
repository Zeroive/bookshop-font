<template>
  <div>
    <navbar-component>商品详情{{$route.query.id}}</navbar-component>
    <img :src="item.imgUrl" alt="">
    <van-card class="Mcard">
      <template #price>
        <small>￥</small>
        <span class="Mprice">
          {{item.price}}
        </span>
      </template>
      <template #title>
        <div class="Mtitle">
          {{item.name}}
        </div>
      </template>
      <template #tags>
        <van-tag plain type="danger">新品上市</van-tag>
      </template>
      <template #footer>
        <van-stepper v-model="number" theme="round" button-size="22" disable-input />
      </template>
    </van-card>
    <div class="Minfo">{{item.info}}</div>

    <van-action-bar>
      <van-action-bar-icon icon="star-o" text="收藏" @click="onClickStarIcon" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge='this.$store.state.cartCount' />
      <van-action-bar-button color="#5FB878" type="warning" text="加入购物车" @click="addShoppingCart" />
      <van-action-bar-button color="#009688" type="danger" text="立即购买" />
    </van-action-bar>
    
    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'

export default {
  name: "DetailView",
  components:{
    NavbarComponent,
    TabBar
  },
  data(){
    return{
      number:1,
      item:{}
    }
  },
  methods:{
    handleAddCart(){
      this.$store.dispatch('updateCartCount')
      this.$toast.success("添加成功")
    },
    onClickStarIcon(){
      
    },
    addShoppingCart(){
      console.log(this.item.id);
      let data = {
          "goodsId":this.item.id,
          "userId": this.$store.state.user.userId,
          "number":this.number,
          "price":this.item.price
      }
      this.getRequest("/shoppingCart/add", data)
    },
    getRequest(url, data, keys=null){
      request({
        url: url,
        method: "post",
        data: data
      }).then(res=>{
        if(res.code == 200){
          // 根据keys来判断
          if(keys == null){
            this.$toast.success("添加成功")
          }else{
            for(let i of keys)
              if(i!=null)this[i] = res.data
          }
        }
      }).catch(error=>{
        console.log(error);
      })
    }
  },
  mounted(){
    this.getRequest("/goods/queryGood", {id: this.$route.query.id}, ["item"])
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

.Mtitle{
  font-weight: bold;
  font-size: 20px;
}

img{
  margin-top: 45px;
  width: 100%;
}

.Minfo{
  margin-top: 10px;
  font-size: 16px;
  margin-bottom: 120px;
  letter-spacing: 2px;
}

.Mprice{
  font-size: 20px;
  color: black;
  font-weight: bold;
}

.Mcard{
  
  
}

</style>