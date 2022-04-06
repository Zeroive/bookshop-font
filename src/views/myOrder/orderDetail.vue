<template>
  <Navbar>订单详情</Navbar>

  <div class="good">
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      本单已为您节省：¥0.1
    </van-notice-bar>
    <van-swipe-cell>
      <van-card centered >
        <template #thumb>
          <img :src="item.imgUrl" alt="">
        </template>
        <template #desc>
          <div class="Mtitle">{{item.name}}</div>
        </template>
        <template #footer>
          <van-button round plain hairline type="primary" size="mini" @click.stop="">加入购物车</van-button>
        </template>
        <template #num>
          <small>￥</small>
          <span class="Mprice">
             {{Number(item.totalPrice).toFixed(2)}}
          </span>
        </template>
      </van-card>
    </van-swipe-cell>

    <van-cell size="large"></van-cell>

    <van-cell-group inset>
      <van-cell :title-style="Mtitle" title="订单编号" :value="item.id" />
      <van-cell :title-style="Mtitle" title="下单时间" :value="time" />
    </van-cell-group>

    <van-cell size="large"></van-cell>

    <van-cell-group inset>
      <van-cell :title-style="Mtitle" title="收件人" :value="item.receiver" />
      <van-cell :title-style="Mtitle" title="收件人电话" :value="phone" />
      <van-cell :title-style="Mtitle" title="收货地址" :value="address" />
    </van-cell-group>

    <van-cell-group inset>
      <van-cell :title-style="Mtitle" title="订单金额" :value="'￥'+Number(item.totalPrice).toFixed(2)" />
    </van-cell-group>
    <van-submit-bar button-text="再次购买" @submit="onSubmit" />

  </div>



</template>

<script>
import Navbar from "@/components/navbar/NavbarComponent"
import request from '@/network/request'
import addressTools from "@/utils/addressTools"

export default {
  name: "orderDetail",
  data(){
    return{
      Mtitle: "text-align: left;width: 150px;font-weight: bold;font-size: 16px;",
      item: {},
      address:"",
      phone:"",
      time:""
    }
  },
  components:{
    Navbar
  },
  computed:{
  },
  mounted(){
    request({
      url: "/order/queryOrderByOrderId",
      method: "post",
      data: {
        id: this.$route.query.id
      }
    }).then((res)=>{
      console.log(res.data)
      this.item = res.data
      this.address = res.data.address+addressTools.areaCode_to_address(res.data.addressCode)
      this.phone = res.data.phone.slice(0,3)+'****'+res.data.phone.slice(-4)
      this.time = res.data.createTime.slice(0,10)+' '+res.data.createTime.slice(11,19)
      
    })
  }
}
</script>

<style lang="scss" scoped>
.good{
  margin: 50px 0 50px 0;

  .van-card{
    border-radius: 10px;
    margin: 0 10px 0 10px;
    background-color: white;
    // border: 0.1px solid #666;
  }

  .Mprice{
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

}

.Mtitle{
  text-align: left;
  width: 150px;
  font-weight: bold;
  font-size: 14px;
}

.van-cell-group{
  padding-top: 50px;
}
</style>