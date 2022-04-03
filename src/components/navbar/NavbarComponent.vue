<template>
  <div class="nav-bar">
    <div class="left" ><slot name="left">
      <van-icon name="arrow-left" @click="goBack"/>
    </slot></div>
    <div class="center"><slot></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  methods:{
    goBack(){
      console.log("返回")
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
  .nav-bar{
    display: flex;
    background-color: var(--color-tint);
    height: 45px;
    color: white;
    text-align: center;
    line-height: 45px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    box-shadow: 0 2px 0 rgba(100,100,100,0.1);
  }
  .left, .right{
    width: 38px;
  }
  .center{
    flex: 1;
  }
</style>