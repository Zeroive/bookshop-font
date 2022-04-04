<template>
  <nav v-if="$store.state.identity!=''">
    <router-link class="tab-bar-item"  to="/home">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei_"></i></div>
      <div>分类</div>
    </router-link>
    <router-link  class="tab-bar-item" to="/cart">
      <van-badge :content="$store.state.cart.count" max="9" :show-zero="false">
        <div class="icon"><i class="iconfont icon-a-gouwuchegouwu"></i></div>
      </van-badge>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-wode"></i></div>
      <div>我的</div>
    </router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

nav {
  background-color: #F6F6F6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: -1px;
  box-shadow: 0 -3px 3px rgba(100,100,100,0.1);

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .tab-bar-item{
    flex: 1;
    height: 50px;
    text-align: center;
    font-size: var(--font-size);
  }
  .tab-bar-item .icon{
    width: 24px;
    height: 24px;
    margin-top: 5px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>