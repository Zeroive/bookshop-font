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
    <div class="good-list">

      <van-cell class="top-bar">
        <template #value >
          <van-icon name="location-o" style="margin-right: 3px"/>
          <span @click="popup" class="address-edit">配送至：{{address_list[current_address_index].title}}</span>
        </template>
      </van-cell>

      <van-swipe-cell v-for="item in goodlist" :key="item.id">

        <van-card
          :price="Number(item.price*item.num).toFixed(2)"
          :desc="item.desc"
          :title="item.title"
        >
          <template #num>
            <van-stepper @plus="setChoosed(item.id)" v-model="item.num" theme="round" button-size="22" disable-input />
          </template>

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

        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteGood(item.id)" />
        </template>

      </van-swipe-cell>

    </div>

    <van-submit-bar :price="totalPrice" :button-text="buttomName" @submit="onSubmit">
      <van-checkbox v-model="isCheckedAll" checked-color="#ee0a24">全选</van-checkbox>
    </van-submit-bar>

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
            <van-cell @click="change_address(index)" v-for="(item,index) in address_list" :title="item.title" :label="item.label" :key="index">
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

export default {
  name: "Cart",
  data(){
    return{
      checkedAll: false,
      goodlist:[],
      buttonFlag: true,
      current_address_index:0,
      isShow: false,
      address_list:[
        {
          title:"淮安软件园",
          label:"江苏省淮安市清江浦区黄码镇",
        },{
          title:"徐州工程学院",
          label:"江苏省徐州市云龙区大龙湖街道",
        }
      ],
    }
  },
  components:{
    Navbar,
    TabBar
  },
  methods:{
    onSubmit(){
      if(this.buttonFlag)
        this.$toast.success("下单成功")
      else{
        for(let i = this.goodlist.length-1; i >= 0; i--){
          if(this.goodlist[i].checked){
            this.goodlist.splice(i, 1)
          }
      }
      }
    },
    deleteGood(id){
      for(let i in this.goodlist){
        if(id == this.goodlist[i].id){
          this.goodlist.splice(i, 1)
          break
        }
      }
    },
    setChoosed(id){
      this.goodlist.map(n=>{if(id==n.id)n.checked=true})
    },
    popup(){
        this.isShow = true
    },
    change_address(index){
      this.current_address_index = index
      this.isShow = false
    }
  },
  computed:{
    totalPrice(){
      return this.goodlist.reduce((pre, cur)=>pre+(cur.checked?(cur.num*cur.price):0),0)*100
    },
    isCheckedAll:{
      get(){
        if(this.goodlist.length == 0)return false
        return this.goodlist.reduce((pre, cur)=>pre && cur.checked,true)
      },
      set(nVal){
        this.goodlist.map(n=>{n.checked = nVal})
      }
    },
    buttomName(){
      if(this.buttonFlag)
        return "提交订单"
      else
        return "删除"
    },
    rightSolt(){
      if(this.buttonFlag)
        return "管理"
      else
        return "退出管理"
    }
  },
  mounted(){
    this.goodlist = this.$store.state.cart.goodlist
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

  .van-swipe-cell{
    margin-top: 10px;
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