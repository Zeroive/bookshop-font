<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中"
      @load="onLoad"
      :offset="50"
      :immediate-check="false"
    >
    <div class="goods-list">
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
      <GoodsItem>{{tabIndex}}</GoodsItem>
    </div>
  </van-list>
</template>

<script>
import GoodsItem from "@/components/content/goods/GoodsItem";
export default {
  name: "GoodList",
  props:{
    tabIndex:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data(){
    return{
      loading: false,
      finished: false
    }
  },
  components:{
    GoodsItem,
  },
  methods:{
    onLoad(){
      console.log("在加载了,在加载了!");
      // this.loading = false
      // this.finished = true
    }
  }
}
</script>

<style scoped>


.goods-list{
  display: flex;
  /*自动换行*/
  flex-wrap: wrap;
  padding: 5px;
  
  /*四周环绕*/
  justify-content: space-around;
  margin: 0px 5px 0px 5px;
  border-radius: 5px;
}
</style>