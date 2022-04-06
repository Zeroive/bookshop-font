<template>
  <div>
    <navbar-component>
      <template #default>我的</template>
      <template #right >
          <van-icon name="setting-o" style="margin-right: 3px" />
      </template>
    </navbar-component>
    <div class="main-box">
      <div id="userInfo">
        <van-cell style="background-color: #F6F6F6" :title="userInfo.username">
          <template #icon>
            <van-image :src="userInfo.src" width="6rem"  round/>
          </template>
          <template #title>
            <span style="font-size: 15px;">{{userInfo.username}}</span>
          </template>
          <template #label>
            <span style="font-size: 8px">电子邮箱：{{userInfo.email}}</span>
            <br>
            <span style="font-size: 8px">关注 | 粉丝</span>
          </template>
        </van-cell>
      </div>

      <div id="orders">
        <van-row  justify="space-around">
          <div style="font-size: 6px;" v-for="(item,index) in shop_icons" :key="index">
            <van-icon :name="item.icon_name" />{{item.icon_msg}} {{item.num}}
          </div>
        </van-row>
        <van-row  justify="space-around">
          <Icon v-for="(item,index) in order_icons"
                :icon="item" :key="index" @click="pageTo(item.path)"
          />
        </van-row>
      </div>

      <!-- <div id="others">
        <van-row justify="space-around">
          <Icon v-for="(item,index) in service_icons"
            :icon="item" :key="index"
          />
        </van-row>
      </div> -->

      <van-row justify="end">
        <div class="change">
          <van-icon name="replay"/> 换一换
        </div>
      </van-row>
      <good-list></good-list>
    </div>

    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import Icon from "@/components/common/Icon";
import DetailView from "@/views/detail/DetailView";
import GoodList from "@/components/content/goods/GoodList";
import TabBar from "@/components/common/TabBar.vue";

export default {
  name: "ProfileView",
  data(){
    return{
      userInfo:{
        username:'',
        email:'',
        src:'https://img.yzcdn.cn/vant/cat.jpeg',
      },
      order_icons:[
        {
          icon_name:"balance-list-o",
          icon_msg:"待付款",
          icon_size: 28,
        },
        {
          icon_name:"logistics",
          icon_msg:"待收货",
          icon_badge:1,
          icon_size: 28,
        },
        {
          icon_name:"location",
          icon_msg:"我的地址",
          icon_size: 28,
          icon_color:"green",
          path: "/address"
        },
        {
          icon_name:"star",
          icon_msg:"收藏",
          icon_size: 28,
          icon_color:"rgb(255, 255, 50)",
          path: "/collection"
        },
        {
          icon_name: "orders-o",
          icon_msg: "我的订单",
          icon_color:"#fd6d6d",
          icon_size: 28,
          path: "/myorder"
        }
      ],
      shop_icons:[
        {
          icon_name:"shop-collect-o",
          icon_msg:"店铺关注",
          num:0,
        },
        {
          icon_name:"star-o",
          icon_msg:"商品收藏",
          num:0,
        },
        {
          icon_name:"clock-o",
          icon_msg:"浏览记录",
          num:0,
        }
      ],
      service_icons:[
        {
          icon_name:"service-o",
          icon_msg:"客户服务",
          icon_size: 28,
          icon_color:"#3139fc"
        }, {
          icon_name:"after-sale",
          icon_msg:"闲置换钱",
          icon_size: 28,
          icon_color:"#f5d24e"
        }, {
          icon_name:"vip-card-o",
          icon_msg:"我的会员",
          icon_size: 28,
          icon_color:"#ff0202"
        }, {
          icon_name:"paid",
          icon_msg:"我的钱包",
          icon_size: 28,
          icon_color:"#983cf8"
        }, {
          icon_name:"qr",
          icon_msg:"更多",
          icon_size: 28,
          icon_color:"#3dfd4d"
        }
      ]
    }
  },
  mounted() {
    this.userInfo.username = this.$store.state.username
    this.userInfo.email = '123123123@qq.com'
  },
  methods:{
    pageTo(path){
      this.$router.push({path:path})
    }
  },
  components:{
    GoodList,
    DetailView,
    Icon,
    NavbarComponent,
    TabBar
  }
}
</script>

<style scoped lang="scss">
.main-box{
  padding-top: 50px;
  background-color: white;
  min-height: 600px;

  #userInfo,#orders,#others{
    margin: 5px 10px;
    background-color:#F6F6F6;
    border-radius:5px;
    padding: 5px;
  }
  #userInfo{

    span{
      margin-left: 30px;
      font-size: var(--font-size);
    }
  }

  #orders{
    padding: 10px;

    :first-child{
      margin-bottom: 5px;
    }
  }

  .change{
    border-radius: 8px;
    background-color: rgba(255, 144, 144, 0.58);
    color: rgba(252, 69, 69, 0.96);
    padding: 3px;
    line-height: 10px;
    font-size: 10px;
    margin: 5px 10px;
  }

}
</style>