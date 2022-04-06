<template>
  <!-- 头部 -->
  <Navbar>我的订单</Navbar>
  <!-- 商品列表 -->
  <div class="good-list">
    <van-swipe-cell>
      <!-- 商品卡片 -->
        <van-card centered v-for="(item, index) in goodlist" :key="index" @click="goDetail(item.id)">
          <!-- 商品图片，绑定参数传过来的地址 -->
          <template #thumb>
            <img :src="item.thumb" alt="">
          </template>
          <!-- 商品标题 -->
          <template #desc>
            <div class="Mtitle">{{item.title}}</div>
          </template>
          <!-- 商品的操作 -->
          <template #footer>
            <!-- 删除操作 -->
            <van-button round plain hairline type="primary" size="mini" @click.stop="handleDeleteOrder(item.id)">删除订单</van-button>
            <!-- 再次购买操作，跳转到下单界面 -->
            <van-button round plain hairline type="primary" size="mini" @click.stop="handleAddOrder(item)">再次购买</van-button>
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
  methods:{
    // 再次购买
    handleAddOrder(item){
      this.$router.push({path:"/submitorder", query:{goodsId:item.goodsId, number:item.number}})
    },
    // 删除订单
    handleDeleteOrder(id){
      request({
      url: "/order/cancel",
      method: "post",
      data:{
        userId: this.$store.state.user.userId,
        id: id
      }}).then(res=>{
        this.goodlist = res.data.filter(val =>
          val.status == 1
        ).map(val=>{
            return{
              "id":val.goodsId,
              "number":val.number,
              "title":val.name,
              "totalPrice":val.totalPrice,
              "thumb":val.imgUrl,
              "goodsId": val.goodsId,
              "status": val.status
            }
        })
        this.$toast.fail("删除成功")
      }).catch(error=>{
        console.log(error);
      })
    },
    // 前往商品详情页
    goDetail(id){
      this.$router.push({
        path:'/orderdetail',
        query:{
          id:id
        }
      })
    },
  },
  mounted(){
    // 请求所有订单
    request({
      url: "/order/all",
      method: "post",
      data:{
        userId: this.$store.state.user.userId
      } 
    }).then(res=>{
      this.goodlist = res.data.filter(val =>
        val.status == 1
      ).map(val=>{
          return{
            "id":val.id,
            "number":val.number,
            "title":val.name,
            "totalPrice":val.totalPrice,
            "thumb":val.imgUrl,
            "goodsId": val.goodsId,
            "status": val.status
          }
      })
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