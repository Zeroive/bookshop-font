<template>
  <div>
    <Navbar>
      <template #default>
        购物车
      </template>
      <template #right>
        <div @click="buttonFlag=!buttonFlag" style="font-size:var(--font-size);">{{rightSolt}}</div>
      </template>
    </Navbar>

    <!-- 商品列表 -->
    <div class="good-list">
      <!-- 选择的地址 -->
      <van-cell class="top-bar">
        <template #value >
          <van-icon name="location-o" style="margin-right: 3px"/>
          <span @click="popup" class="address-edit">配送至：{{addressList[current_address_index].address}}</span>
        </template>
      </van-cell>

      <!-- for循环goodsList -->
      <van-swipe-cell v-for="item in goodlist" :key="item.id">
        <!-- 商品卡片 -->
        <van-card
          :price="Number(item.price*item.number).toFixed(2)"
          :desc="item.desc"
        >
          <template #title>
            <div class="Mtitle">
              {{item.title}}
            </div>
          </template>

          <!-- 选择数量 -->
          <template #num>
            <van-stepper @plus="setChoosed(item.id)" v-model="item.number" theme="round" button-size="22" disable-input />
          </template>

          <!-- 图片 -->
          <template #thumb>
            <van-row style="width:150%">
              <van-col span="8">
                <van-checkbox checked-color="#ee0a24" v-model="item.checked"></van-checkbox>
              </van-col>
              <van-col span="16">
                <img :src="item.thumb" alt="">
              </van-col>
            </van-row>
          </template>

        </van-card>

        <!-- 滑动删除 -->
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteGood(item.id)" />
          <!-- {{item.id}} -->
        </template>

        <van-divider />

      </van-swipe-cell>

    </div>

    <!-- 提交订单 -->
    <van-submit-bar :price="totalPrice" :button-text="buttomName" @submit="onSubmit">
      <van-checkbox v-model="isCheckedAll" checked-color="#ee0a24">全选</van-checkbox>
    </van-submit-bar>

    <!-- 选择地址弹出框 -->
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
            <van-cell @click="change_address(index)" v-for="(item,index) in addressList" :title="item.address" :label="item.label" :key="index">
              <template #icon>
                <van-icon name="success" color="red" size="20px" v-if="current_address_index == index"></van-icon>
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
import Navbar from "@/components/navbar/NavbarComponent"
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request';
import addressTools from "@/utils/addressTools"

export default {
  name: "Cart",
  data(){
    return{
      checkedAll: false, //是否全选
      goodlist:[], //商品列表
      buttonFlag: true,//true是提交订单，false是删除
      current_address_index:0, //当前选择地址
      isShow: false, //地址弹出框展示
      addressList:[{"address":""}], // 地址列表
    }
  },
  components:{
    Navbar,
    TabBar
  },
  methods:{
    // 批量提交订单、删除
    onSubmit(){
      if(this.buttonFlag){
        for(let item of this.goodlist){
          if(item.checked){
            this.submitOrder({
              "userId": this.$store.state.user.userId,
              "goodsId": item.goodsId,
              "addressId": this.addressList[this.current_address_index].id,
              "number": item.number,
              "totalPrice": item.number*item.price,
              "status": 1
            })
            this.deleteGood(item.id)
          }
        }
      }
      else{
        for(let item of this.goodlist){
          if(item.checked){
            this.deleteGood(item.id)
          }
      }
      }
    },
    // 删除商品
    deleteGood(id){
      this.getRequest(
        "/shoppingCart/delete", 
        {id: id, userId:this.$store.state.user.userId}, 
        (data)=>{
        this.$store.state.cart.count = data.length
        this.goodlist = data.map(val=>{return{
          "id":val.id,
          "number":val.number,
          "title":val.name,
          "checked":false,
          "price":val.price,
          "tags":[],
          "thumb":val.imgUrl,
          "goodsId": val.goodsId
        }})
      })
    },
    // 选择商品
    setChoosed(id){
      this.goodlist.map(n=>{if(id==n.id)n.checked=true})
    },
    // 地址列表弹出窗口
    popup(){
      this.isShow = true
    },
    // 更换地址列表
    change_address(index){
      this.current_address_index = index
      this.isShow = false
    },
    // 提交单个订单
    submitOrder(data){
      this.getRequest("/order/buy", data, ()=>{
        this.$toast.success("下单成功!")
      })

    },
    // 请求数据
    getRequest(url, data, func=null){
      request({
        url: url,
        method: "post",
        data: data
      }).then(res=>{
        if(res != null && res.code == 200){
          if(func != null)
            func(res.data)
        }
      }).catch(error=>{
        console.log(error);
        this.$toast.fail("操作失败")
      })
    }
  },
  computed:{
    // 总价
    totalPrice(){
      return this.goodlist.reduce((pre, cur)=>pre+(cur.checked?(cur.number*cur.price):0),0)*100
    },
    // 是否选择了所有学校
    isCheckedAll:{
      get(){
        if(this.goodlist.length == 0)return false
        return this.goodlist.reduce((pre, cur)=>pre && cur.checked,true)
      },
      set(nVal){
        this.goodlist.map(n=>{n.checked = nVal})
      }
    },
    // 按钮文字
    buttomName(){
      if(this.buttonFlag)
        return "提交订单"
      else
        return "删除"
    },
    // 右边插槽文字
    rightSolt(){
      if(this.buttonFlag)
        return "管理"
      else
        return "退出管理"
    }
  },
  mounted(){
    // 请求所有购物车列表
    this.getRequest(
      "/shoppingCart/all", 
      {userId: this.$store.state.user.userId}, 
      data=>{
        this.$store.state.cart.count = data.length
        this.goodlist = data.map(val=>{return{
          "id":val.id,
          "number":val.number,
          "title":val.name,
          "checked":false,
          "price":val.price,
          "tags":[],
          "thumb":val.imgUrl,
          "goodsId": val.goodsId
        }
      })
    })
    // 选择地址、添加地址后的重新选择的地址
    const chooseAddressId = localStorage.getItem('chosenAddressId')
    this.getRequest("/address/all", {userId: this.$store.state.user.userId}, data=>{
      this.addressList = addressTools.dbAddress_to_vantAddress(data).map((val, index)=>{
        if(chooseAddressId == -1 && val.isDefault == true)this.current_address_index = index
        else if(chooseAddressId == val.id)this.current_address_index = index
        val["label"] = addressTools.areaCode_to_address(val.areaCode)
        return val
      })
    })
    localStorage.setItem('chosenAddressId', -1)
  }
}
</script>

<style lang="scss" scoped>

.top-bar{
  .address-edit{
    font-size: 12px;
    color: #818080;
  }
  margin-top: 0px;
}

.good-list{
  margin-top: 45px;
  margin-bottom: 120px;


  .Mtitle{
    width: 150px;
    font-weight: bold;
    font-size: 14px;
    transform: translate(50%);
  }

  .van-checkbox{
    width: 20px;
    height: 20px;
    top: 50%;
    left: 30%;
    position: relative;
    margin-top: -10px;
    margin-left: -10px;
  }

  .van-card{
    border-radius: 10px;
    margin: 0 10px 0 10px;
    background-color: white;
    // border: 0.1px solid #666;
    
  }
}

.van-submit-bar{
  margin-bottom: 60px;
  background-color: rgb(247, 248, 250);
  border-radius: 10px;
}

.delete-button {
  height: 100%;
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