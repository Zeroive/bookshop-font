<template>
  <div class="goods-item">
    <img src="@/assets/images/recommend1.png">
    <div class="goods-info">
      <p>细说PHP<slot></slot></p>
      <span class="price"><small>￥</small>32.00</span>
      <span class="collect"><img src="@/assets/images/collect.png">3</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem"
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