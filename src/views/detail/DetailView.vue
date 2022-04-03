<template>
  <div>
    <navbar-component v-slot:default>商品详情:{{$route.query.id}}</navbar-component>
    <img :src="src">
    <div class="goods-list">
      <van-card
          class="vant-card"
          :num="num"
          :price="price"
          :desc="desc"
          :title="title"
      >
        <template #tags>
          <van-tag plain type="danger" v-for="(item,index) in tags" :key="index">{{item}}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" color="#ffBc00" @click="handlerAddCart">加入购物车</van-button>
          <van-button size="mini" color="#ff0000">购买</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";

export default {
  name: "DetailView",
  components:{
    NavbarComponent
  },
  data(){
    return{
      src:'',
      num:0,
      price:0,
      title:"",
      desc:"",
      tags:[],
    }
  },
  mounted() {
    setTimeout(()=>{
      this.src = '/img/swipe1.704ba92b.jpg '
      this.price = 32.00
      this.num = 20
      this.desc = "这里是详细描述"
      this.title =  "细说PHP"
      this.tags = ['新品','推荐']
    },1000)
  },
  methods:{
    handlerAddCart(){
      this.$store.dispatch('updateCarCount')
      this.$toast.success("添加成功")
    }
  }
}
</script>

<style scoped lang="scss">
.vant-card{
  text-align: left;
  font-size: var(--font-size);
}
</style>