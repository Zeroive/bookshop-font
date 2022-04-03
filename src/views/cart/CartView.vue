<template>
  <div>
    <navbar-component v-slot:default>购物车</navbar-component>
    <div class="main-box">
      <van-cell class="top-bar">
        <template #value >
          <van-icon name="location-o" style="margin-right: 3px"/>
          <span @click="popup" class="address-edit">配送至：{{address_list[current_address_index].title}}</span>
        </template>
        <template #right-icon>
          <span @click="changToEdit">
          {{this.edit}}
          </span>
        </template>
      </van-cell>
      <div class="cart-list">
        <van-swipe-cell v-for="(item,index) in goods" :key="index">
          <van-card
                  class="cart-item"
                  :price="item.price.toFixed(2)"
                  :desc="item.desc"
                  :title="item.title"
              >
                <template #num>
                  <div style="border: 1px solid gray;border-radius: 6px;width: 60px;text-align: center">
                    <span @click="addNum(index)" style="border-right: 1px solid gray">+&nbsp;&nbsp;</span>
                    &nbsp;{{item.num}}&nbsp;
                    <span @click="minusNum(index)" style="border-left: 1px solid gray">&nbsp;&nbsp;-</span>
                  </div>
                </template>
                <template #thumb>
                  <van-checkbox v-model="item.checked" checked-color="red" icon-size="16px">
                    <template #default>
                      <img :src="item.src">
                    </template>
                  </van-checkbox>
                </template>
              </van-card>
          <template #right>
            <van-button square type="danger" text="删除" @click="deleteGood(index)" style="height: 100%"/>
          </template>
        </van-swipe-cell>
      </div>
      <div class="bottom-bar">
        <van-cell>
          <template v-slot:title>
            <van-checkbox @click="selectChange" v-model="checkedAll" label-disabled checked-color="red">全选 合计:￥{{totalPrice}}</van-checkbox>
          </template>
          <template v-slot:right-icon>
            <button v-if="isEdit" @click="deleteSelected">删除({{totalNum}})</button>
            <button v-else>去结算({{totalNum}})</button>
          </template>
        </van-cell>
      </div>

      <van-popup
          position="bottom"
          round
          v-model:show="isShow"
          :style="{height:'40%'}"
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
            <button>选择其他地址</button>
          </div>
        </template>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Icon from "@/components/common/Icon";

export default {
  name: "CartView",
  components:{
    Icon,
    NavbarComponent
  },
  data(){
    return{
      isShow:false,
      isEdit:false,
      current_address_index:0,
      address_list:[
        {
          title:"淮安软件园",
          label:"江苏省淮安市清江浦区黄码镇",
        },{
          title:"徐州工程学院",
          label:"江苏省徐州市云龙区大龙湖街道",
        }
      ],
      goods:[
        {
          id:"1",
          checked:true,
          num:1,
          desc:"这里是描述信息",
          title:"细说PHP",
          src:"/img/recommend1.d9471290.png",
          price:32.00
        },
        {
          id:"2",
          checked:true,
          num:2,
          desc:"这里是描述信息",
          title:"Java从入门到放弃",
          src:"/img/recommend1.d9471290.png",
          price:68.00
        },
        {
          id:"3",
          checked:true,
          num:1,
          desc:"这里是描述信息",
          title:"Python从入门到放弃",
          src:"/img/recommend1.d9471290.png",
          price:54.00
        },
        {
          id:"4",
          checked:true,
          num:1,
          desc:"这里是描述信息",
          title:"细说PHP",
          src:"/img/recommend1.d9471290.png",
          price:32.00
        },
        {
          id:"5",
          checked:true,
          num:1,
          desc:"这里是描述信息",
          title:"细说PHP",
          src:"/img/recommend1.d9471290.png",
          price:32.00
        },
        {
          id:"6",
          checked:true,
          num:1,
          desc:"这里是描述信息",
          title:"细说PHP",
          src:"/img/recommend1.d9471290.png",
          price:32.00
        },
        {
          id:"7",
          checked:true,
          num:1,
          desc:"这里是描述信息",
          title:"细说PHP",
          src:"/img/recommend1.d9471290.png",
          price:32.00
        },
      ]
    }
  },
  computed:{
    checkedAll(){
      let checked = true
      for (let item of this.goods) {
        checked = item.checked
        if (!checked) break;
      }
      return checked
    },
    totalNum(){
      let num = 0
      for (const item of this.goods) {
        if (item.checked)
          num += item.num
      }
      return num
    },
    totalPrice(){
      let totalPrice = 0.0
      for (let item of this.goods) {
        if (item.checked)
          totalPrice = totalPrice + item.num * item.price
      }
      totalPrice = totalPrice.toFixed(2)
      return totalPrice
    },
    edit(){
      return this.isEdit?"完成":"编辑"
    }
  },
  methods:{
    deleteSelected(){
      let current_goods = []
      for (const item of this.goods) {
        if (!item.checked)
          current_goods.push(item)
      }
      this.goods = current_goods
    },
    changToEdit(){
      this.isEdit = !this.isEdit
    },
    selectChange(){
      const nowChecked = !this.checkedAll
      for (let item of this.goods){
        item.checked = nowChecked
      }
    },
    change_address(index){
      this.current_address_index = index
      this.isShow = false
    },
    addNum(index){
      this.goods[index].num++
    },
    minusNum(index){
      this.goods[index].num = this.goods[index].num > 1 ? this.goods[index].num-1 : this.goods[index].num
    },
    deleteGood(index){
      this.goods.splice(index,1)
    },
    popup(){
        this.isShow = true
    }
  }
}
</script>

<style scoped lang="scss">

.main-box{
  padding-top: 45px;

  .top-bar{
    .address-edit{
      font-size: 12px;
      color: #818080;
    }
  }

  .cart-list{
    //background: #F6F6F6;
    width: 100%;
    height: 700px;
    .cart-item{
      margin: 5px 2px;
      border-radius: 5px;
    }
  }


  .bottom-bar{
    font-size: var(--font-size);
    width: 100%;
    position: fixed;
    bottom: 50px;



    button{
      color: white;
      background-color: red;
      border: 0px;
      border-radius: 8px;
      height: 30px;
      width: 80px;
    }
  }


  .popup-main-box{
    padding: 10px;

    :first-child{
      font-size: var(--font-size);
      margin: 10px 0px;
    }


    button{
      color: white;
      background-color: red;
      border: 0px;
      border-radius: 8px;
      font-size: var(--font-size);
      height: 30px;
      width: 100%;
    }
  }


}
</style>