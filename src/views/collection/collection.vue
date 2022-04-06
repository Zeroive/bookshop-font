<template>
  <NavbarComponent>我的收藏</NavbarComponent>

  <div class="good-list">
    <van-swipe-cell centered v-for="item in goodlist" :key="item.id">
      <van-divider/>

      <van-card  @click="goDetail(item.goodsId)">
        <template #thumb>
          <img :src="item.thumb" alt="">
        </template>

        <template #desc>
          <div class="Mtitle">{{item.title}}</div>
        </template>

        <template #footer>
          
        </template>

        <template #bottom>
          <div style="text-align:left">
            <small>￥</small>
            <span class="Mprice">{{item.totalPrice.toFixed(2)}}</span>
          </div>
        </template>
      </van-card>
      <template #right>
        <van-button square class="deleteButton" type="danger" text="删除" />
      </template>

    </van-swipe-cell>
  </div>

  <TabBar></TabBar>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'

export default {
  components:{
    NavbarComponent,
    TabBar
  },
  data(){
    return{
      goodlist: [] //商品列表
    }
  },
  methods:{
    // 前往商品详情页
    goDetail(id){
      // console.log(id);
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    }
  },
  mounted(){
    // 请求收藏的商品
    request({
      url: "/collection/all",
      method: "post",
      data:{
        userId: this.$store.state.user.userId
      }
    }).then(res=>{
      this.goodlist = res.data.map(val=>{return{
        "id":val.id,
        "number":val.number,
        "title":val.name,
        "totalPrice":val.price,
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
    width: 100%;
    font-weight: bold;
    font-size: 14px;
  }

  .Mprice{
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

  .deleteButton{
    height: 100%;
  }

}
</style>