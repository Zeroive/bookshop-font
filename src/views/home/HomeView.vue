<template>
  <div>
    <navbar-component v-slot:default>机锋程序员</navbar-component>
    <!--  轮播图 -->
    <HomeSwipe></HomeSwipe>
    <!--    推荐商品 -->
    <RecommendView></RecommendView>
    <!--  选择栏  -->
    <TabControl :titles="titles" @tabClick="getTabIndex"></TabControl>
    <!-- 商品列表   -->
    <GoodList :tabIndex="tabIndex"></GoodList>
    <!--    返回顶部-->
    <BackTop></BackTop>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import RecommendView from "@/views/home/child/RecommendView";
import TabControl from "@/components/common/TabControl";
import GoodList from "@/components/content/goods/GoodList";
import BackTop from "@/components/common/BackTop";
import HomeSwipe from "@/views/home/child/HomeSwipe";
export default {
  name:'HomeView',
  components:{
    HomeSwipe,
    BackTop,
    GoodList,
    NavbarComponent,
    RecommendView,
    TabControl
  },
  data(){
    return{
      titles:['畅销','精选','新书'],
      tabIndex:0,
    }
  },
  methods:{
    getTabIndex(index){
      this.tabIndex = index
    }
  }

}
</script>

<style scoped>

</style>