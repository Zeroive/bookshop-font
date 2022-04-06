<template>
<!-- 商品卡片 -->
  <div class="goods-item">
    <img :src="item.thumb">
    <div class="goods-info">
      <p>{{item.title}}<slot></slot></p>
      <span class="price"><small>￥</small>{{item.price.toFixed(2)}}</span>
      <span class="collect"><van-icon name="star-o" /> 3</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props:{
    item:{
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
.goods-item{
  width: 46%;
  position: relative;
  padding-bottom: 10px;

  img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info{
    font-size: var(--font-size);
    //position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    overflow: hidden;

    p{
      overflow: hidden;
      //文本过长隐藏
      text-overflow: ellipsis;
      margin-bottom: 3px;
      white-space: nowrap;
    }

    .price{
      color: red;
      margin-right: 20px;
    }

    .collect{
      position: relative;

      img{
        width: 14px;
        height: 14px;
      }
    }

  }

}
</style>