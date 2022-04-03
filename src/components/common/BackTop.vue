<template>
  <div class="backTop" v-show="goTopShow" @click="goTop"></div>
</template>

<script>
export default {
  name: "BackTop",
  data(){
    return{
      scrollTop:'',
      goTopShow:false,
    }
  },
  methods:{
    /*显示隐藏图标*/
    handleScroll(){
      /*获取滚动条的位置*/
      this.scrollTop = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
      if(this.scrollTop>45){
        this.goTopShow = true
      }else{
        this.goTopShow = false
      }
    },
    /*回到顶部方法*/
    goTop(){
      let timer = null;
      let _that = this;
      /*跟动画相关*/
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn(){
        if(_that.scrollTop>0){
          _that.scrollTop -=250;
          document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
          timer = requestAnimationFrame(fn);
        }else{
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      })
    }
  },
  mounted() {
    /*监听页面滚动操作*/
    window.addEventListener('scroll',this.handleScroll);
  }
}
</script>

<style scoped>
  .backTop{
    background: url("../../assets/images/up.png") no-repeat;
    background-size: cover;
    border: black solid 3px;
    width: 35px;
    height: 35px;
    position: fixed;
    right: 30px;
    bottom: 80px;
    z-index: 20;
    border-radius: 50%;
    box-shadow: 4px 4px 4px #888888;/*阴影*/
  }
</style>