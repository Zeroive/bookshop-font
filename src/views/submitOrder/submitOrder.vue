<template>
  <div>
    <navbar-component>提写订单</navbar-component>

    <van-cell size="large" class="Mcontact" @click="showPopup">
      <template #title>
        <div class="Mtitle">
          {{chosenAddress}}
        </div>
      </template>
      <template #label>
        <div class="Mlabel">
          {{chosenuser}}
        </div>
      </template>
      <template #icon>
        <van-icon name="location-o"  size="20px"></van-icon>
      </template>
      <template #right-icon>
        <van-icon name="arrow"  size="20px"></van-icon>
      </template>
    </van-cell>

    <!-- 商品卡片 -->
    <van-card  class="Mcard">
      <template #title>
        <div class="Mtitle">
          {{item.name}}
        </div>
      </template>

      <template #price>
        <small style="color:red">￥</small>
        <span class="Mprice">
          {{(totalPrice).toFixed(2)}}
        </span>

      </template>

      <template #num>
        <van-stepper v-model="number" theme="round" button-size="22" disable-input />
      </template>

      <template #thumb>
        <van-row style="width:150%">
          <van-col span="16">
            <img :src="item.imgUrl" alt="">
          </van-col>
        </van-row>
      </template>

    </van-card>

    <van-cell-group class="">
      <van-cell :value="'￥'+totalPrice.toFixed(2)" >
        <template #title>
          <span class="custom-title">商品金额</span>
        </template>
      </van-cell>
      <van-cell :value="'￥'+freightCharge.toFixed(2)" label="支持无接触配送" >
        <template #title>
          <span class="custom-title">运费</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 结算按钮 -->
    <van-submit-bar :price="item.price*number*100" button-text="提交订单" @submit="onSubmit" />

    <van-popup
        position="bottom"
        round
        v-model:show="isShow"
        :style="{height:'60%'}"
    >
      <template #default>
        <div class="popup-main-box">
          <div>配送至</div>
          <van-list>
            <van-cell @click="change_address(item.id)" v-for="(item,index) in addressList" :title="item.address" :label="item.label" :key="index">
              <template #icon>
                <van-icon name="success" color="red" size="20px" v-if="chosenAddressId == item.id"></van-icon>
                <van-icon name="location-o"  size="20px" v-else></van-icon>
              </template>
            </van-cell>
          </van-list>
          <button @click="this.$router.push({path:'/address'})">选择其他地址</button>
        </div>
      </template>
    </van-popup>

    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'
import addressTools from "@/utils/addressTools"

export default {
  components:{
    NavbarComponent,
    TabBar
  },
  data(){
    return{
      chosenAddressId: 0,
      addressList:[],
      disabledList:[],
      isShow: false,
      item:{},
      number: 1
    }
  },
  methods:{
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
    showPopup(){
      this.isShow = true
    },
    change_address(index){
      this.chosenAddressId = index
      this.isShow = false
    },
    onSubmit(){
      this.getRequest(
        "/order/buy", 
        {
          "userId": this.$store.state.user.userId,
          "goodsId": this.item.id,
          "addressId": this.chosenAddressId,
          "number": this.number,
          "totalPrice": this.number*this.item.price,
          "status": 1
        },
        ()=>{this.$toast.success("下单成功!");this.$router.push("/home");}
      )
    }
  },
  computed:{
    chosenAddress(){
      let str = ""
      this.addressList.filter(val=>{val.id == this.chosenAddressId?str=val.address:""})
      return str
    },
    chosenuser(){
      let name = ""
      let phone = ""
      this.addressList.filter(val=>{val.id == this.chosenAddressId?(name=val.name, phone=val.tel):""})
      return name + '  ' + phone.slice(0,3)+'****'+phone.slice(-4)
    },
    totalPrice(){
      return this.item.price*this.number
    },
    freightCharge(){
      return 0
    }
  },
  mounted(){
    this.number = this.$route.query.number
    this.getRequest("/goods/queryGood", {id: this.$route.query.goodsId}, (data)=>{
      this.item = data
      this.loadfinished = true
    })
    const chooseAddressId = localStorage.getItem('chosenAddressId')
    this.getRequest("/address/all", {userId: this.$store.state.user.userId}, data=>{
      this.addressList = addressTools.dbAddress_to_vantAddress(data).map((val)=>{
        if(chooseAddressId == -1 && val.isDefault == true){this.chosenAddressId = val.id}
        else if(chooseAddressId == val.id){this.chosenAddressId = val.id}
        val["label"] = addressTools.areaCode_to_address(val.areaCode)
        return val
      })
      console.log(this.chosenAddressId);
    })
    localStorage.setItem('chosenAddressId', -1)
  }

}
</script>

<style lang="scss" scoped>

.Mcontact{
  margin-top: 60px;
  font-size: 18px;
  height: 100px;
}

.Mcard{
  margin-top: 60px;
}

.Mtitle{
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}

.Mlabel{
  text-align: left;
  font-weight: bold;
  font-size: 10px;
  letter-spacing: 1px;
  margin-top: 20px;
}

.Mprice{
  font-size: 20px;
  color: red;
  font-weight: bold;
}

.Mcontact:before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: repeating-linear-gradient(-80deg,var(--van-warning-color) 0,var(--van-warning-color) 20%,transparent 0,transparent 25%,var(--van-primary-color) 0,var(--van-primary-color) 45%,transparent 0,transparent 50%);
  background-size: 80px;
  content: "";
}

.custom-title{
  margin-right: 4px;
  vertical-align: middle;
  font-size: 16px;
  line-height: 24px;
}

.van-submit-bar{
  margin-bottom: 60px;
  background-color: rgb(247, 248, 250);
  border-radius: 10px;
}

.popup-main-box{
  padding: 10px;

  :first-child{
    font-size: var(--font-size);
    margin: 10px 0px;
  }


  button{
    position: absolute;
    color: white;
    background-color: red;
    border: 0px;
    border-radius: 15px;
    font-size: var(--font-size);
    height: 35px;
    width: 80%;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
  }
}


</style>