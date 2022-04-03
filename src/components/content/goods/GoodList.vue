<template>
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
  components:{
    GoodsItem,
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  /*自动换行*/
  flex-wrap: wrap;
  padding: 5px;
  background-color: #F6F6F6;
  /*四周环绕*/
  justify-content: space-around;
  margin: 0px 5px 50px 5px;
  border-radius: 5px;
}
</style>