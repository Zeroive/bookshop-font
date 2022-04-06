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
            {{item.title}}
          </div>
          <div class="popPrice">
            <small>￥</small>
            <span class="Mprice">
              {{item.price}}
            </span>
          </div>
        </template>

        <template #default>
          <van-collapse v-model="activeCollapse">
            <van-collapse-item name="1">
              <template #title>
                {{chosenAddress}}
              </template>
              <van-cell-group>
                <van-cell v-for="(item, index) in addressList" :key="index" is-link>
                  <template #title>
                    {{item.address}}
                  </template>
                  <template #right-icon>
                    <van-icon :name="addressIcon(item.id)" :color="addressColor(item.id)" size="20px"></van-icon>
                  </template>
                </van-cell>
              </van-cell-group>
            </van-collapse-item>
          </van-collapse>
        </template>
      </van-dialog>


    </div>

    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'
import addressTools from "@/utils/addressTools"

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
      addressList: [], //地址列表
      chosenAddressId: 0, //当前选择的地址
      isAddOrderPopup: false,
      activeCollapse: []
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
      this.isAddOrderPopup = false
      this.$router.push({path:"/submitorder", query:{goodsId:this.goodsId}})
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
      if(str != null)
        return str.split('').map((val, index)=>{return val=='。'&&str.charAt(index+1)!='\n'?'。\n':val}).join('')
      return ''
    },
    addressIcon(id){
      return this.chosenAddressId == id ? "success" : "location-o"
    },
    addressColor(id){
      return this.chosenAddressId == id ? "red" : ""
    }
  },
  computed:{
    starIcon(){
      return this.isCollect ? "star": "star-o"
    },
    chosenAddress(){

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
    this.getRequest(
      "/address/all",
      {userId: this.$store.state.user.userId},
      (data)=>{
        this.addressList = addressTools.dbAddress_to_vantAddress(data)
        this.addressList.map(val=>{val.isDefault?(this.chosenAddressId=val.id):''})
      }
    )
  }
}
</script>

<style scoped lang="scss">

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: left;
  margin: 0 15px;
  text-indent:2em;
}

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
  .Mprice{
    color: red;
    font-weight: bold;
    text-align: right;
  }
}

</style>