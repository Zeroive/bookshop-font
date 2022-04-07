<template>
  <van-overlay :show="show" @click="show = false">
    <div class="wrapper" @click.stop>
      <div class="block" >
        <van-icon name="success" color="green"  size="80px" />
        <div class="tip">支付成功</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import Icon from '@/components/common/Icon.vue'
export default {
  components: { Icon },
  data(){
    return{
      show:true
    }
  },
  mounted() {
    console.log(this.$store.state.toGoodId)
    setTimeout(()=>{
      window.opener=null;
      window.open('',self);
      window.close();

    },5000);

  }

}
</script>

<style>

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    padding-top: 50px;
    width: 200px;
    height: 200px;
    background-color: #fff;
  }

  .tip{
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
  }

</style>