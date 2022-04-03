<template>
  <div class="swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item>
        <img src="@/assets/images/swipe1.jpg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/images/swipe1.jpg">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/images/swipe1.jpg">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSwipe"
}
</script>

<style scoped lang="scss">
.swipe{
  margin-top: 50px;
}
</style>