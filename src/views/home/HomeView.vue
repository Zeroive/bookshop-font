<template>
  <div class="container">
    <navbar-component>BOOKSTORE</navbar-component>
    <!--  轮播图 -->
    <HomeSwipe></HomeSwipe>
    <!--    推荐商品 -->
    <RecommendView></RecommendView>
    <!--  选择栏  -->
    <TabControl :titles="titles" @tabClick="getTabIndex"></TabControl>
    <!-- 商品列表   -->
    <GoodList :tabIndex="tabIndex" ref="goodlist"></GoodList>
    <!--    返回顶部-->
    <BackTop></BackTop>
    <!-- 底部 -->
    <TabBar></TabBar>
  </div>
  
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import RecommendView from "@/views/home/child/RecommendView";
import TabControl from "@/components/common/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import BackTop from "@/components/common/BackTop";
import HomeSwipe from "@/views/home/child/HomeSwipe";
import TabBar from "@/components/common/TabBar.vue"
export default {
  name:'HomeView',
  data(){
    return{
      titles: ['畅销','精选','新书'],
      tabIndex: 0
    }
  },
  components:{
    HomeSwipe,
    BackTop,
    GoodList,
    NavbarComponent,
    RecommendView,
    TabControl,
    TabBar
  },
  methods:{
    getTabIndex(index){
      this.tabIndex = index
      this.$refs.goodlist.changeTab()
    },
    
  }

}
</script>

<style lang="scss" scoped>

.container{
  margin-bottom: 50px;
}

</style>