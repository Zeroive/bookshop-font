<template>
  <Navbar>我的订单</Navbar>
  <div class="good-list">
    <van-swipe-cell>
        <van-card centered v-for="item in goodlist" :key="item.id">
          <template #thumb>
            <img :src="item.thumb" alt="">
          </template>
          <template #desc>
            <div class="Mtitle">{{item.title}}</div>
          </template>
          <template #footer>
            <van-button round plain hairline type="primary" size="mini">删除订单</van-button>
            <van-button round plain hairline type="primary" size="mini">再次购买</van-button>
          </template>
          <template #num>
            <small>￥</small>
            <span class="Mprice">
              {{item.totalPrice.toFixed(2)}}
            </span>
          </template>
        </van-card>
    </van-swipe-cell>
  </div>
  

  <TabBar></TabBar>
  
</template>

<script>
import Navbar from "@/components/navbar/NavbarComponent"
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'

export default {
  components:{
    Navbar,
    TabBar
  },
  data(){
    return{
      goodlist: []
    }
  },
  mounted(){
    request({
      url: "/order/all",
      method: "post",
      data:{
        userId: this.$store.state.user.userId
      }
    }).then(res=>{
      this.goodlist = res.data.map(val=>{return{
        "id":val.goodsId,
        "number":val.number,
        "title":val.name,
        "totalPrice":val.totalPrice,
        "thumb":val.imgUrl,
        "goodsId": val.goodsId,
        "status": val.status
      }})
    }).catch(error=>{
      console.log(error);
    })
  }
}
</script>

<style lang="scss" scoped>
.good-list{
  margin: 45px 0 50px 0;

  .van-card{
    border-radius: 10px;
    margin: 0 10px 0 10px;
    background-color: white;
    // border: 0.1px solid #666;
  }

  .Mtitle{
    width: 150px;
    font-weight: bold;
    font-size: 14px;
  }

  .Mprice{
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

}
</style>