<template>
  
  <div>
    <navbar-component>商品详情</navbar-component>

    <van-skeleton class="Mskeleton"  v-show="!loadfinished" title :row="9" />
    <div v-show="loadfinished">
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
      <pre class="Minfo">{{handleInfo(item.info)}}</pre>

      <van-action-bar>
        <van-action-bar-icon color="rgb(245, 245, 33)" :icon="starIcon" text="收藏" @click="onClickStarIcon" />
        <van-action-bar-button color="#5FB878" type="warning" text="加入购物车" @click="handleAddCart" />
        <van-action-bar-button color="#009688" type="danger" text="立即购买" @click="handleAddOrder"/>
      </van-action-bar>

      <van-dialog v-model:show="isAddOrderPopup" show-cancel-button>
        <template #title>
          <div class="popTitle">
            {{tiem.title}}
          </div>
          <div class="popPrice">
            <small>￥</small>
            <span class="Mprice">
              {{item.price}}
            </span>
          </div>
        </template>

        <van-collapse v-model="activeNames">
          <van-collapse-item name="1">
            <template #title>
              <div>标题1 <van-icon name="question-o" /></div>
            </template>
            代码是写出来给人看的，附带能在机器上运行。
          </van-collapse-item>
          <van-collapse-item title="标题2" name="2" icon="shop-o">
            技术无非就是那些开发它的人的共同灵魂。
          </van-collapse-item>
        </van-collapse>



      </van-dialog>


    </div>

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
      item:{},
      loadfinished: false,
      isCollect: true,
      goodsId: 0,
      collectionId: 0,
      addressList: [],
      isAddOrderPopup: false
    }
  },
  methods:{
    // 确认/取消收藏
    onClickStarIcon(){
      if(this.isCollect){
        this.$dialog.confirm({
          message:'确认取消收藏？',
        })
        .then(() => {
          // on confirm 确认取消收藏
          this.getRequest(
            "/collection/delete",
            {id: this.collectionId},
            ()=>{this.$toast.fail("已取消收藏");this.isCollect = false}
          )
        })
        .catch(() => {
          // on cancel
        })
      }else{
        // 收藏
        this.getRequest(
          "/collection/add",
          {userId: this.$store.state.user.userId, goodsId: this.goodsId},
          ()=>{this.$toast.success("收藏成功");this.isCollect = true}
        )
      }
    },
    // 添加购物车
    handleAddCart(){
      let data = {
          "goodsId":this.item.id,
          "userId": this.$store.state.user.userId,
          "number":this.number,
          "price":this.item.price
      }
      this.getRequest("/shoppingCart/add", data, ()=>{this.$toast.success("添加成功")})
    },
    // 立即购买
    handleAddOrder(){
      this.isAddOrderPopup = true
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
    handleInfo(str){
      // 处理字符串 。后面加 \n
      return str.split('').map((val, index)=>{return val=='。'&&str.charAt(index+1)!='\n'?'。\n':val}).join('')
    }
  },
  computed:{
    starIcon(){
      return this.isCollect ? "star": "star-o"
    }
  },
  mounted(){
    this.goodsId = this.$route.query.id
    this.getRequest("/goods/queryGood", {id: this.goodsId}, (data)=>{
      this.item = data
      this.loadfinished = true
    })
    this.getRequest(
      "/collection/isExist",
      {userId: this.$store.state.user.userId, goodsId: this.goodsId},
      (data)=>{
        this.isCollect = data==null?false:true;
        if(this.isCollect)this.collectionId=data.id;
    })
  }
}
</script>

<style scoped lang="scss">

.Mskeleton{
  margin-top: 60px;
}

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

.popTitle{
  font-weight: bold;
  width: 100%;
}

.popPrice{
  color: red;
  .Mprice{
    font-weight: bold;
    text-align: right;
  }
}

</style>