<template>
  <div class="icon">
    <van-badge :content="icon.icon_badge" :show-zero="false">
      <van-icon :name="icon.icon_name" :size="icon.icon_size" :color="icon.icon_color"/>
    </van-badge>
    <div>{{icon.icon_msg}}</div>
  </div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon:{
      type:Object,
      default(){
        return {
          icon_name:"",
          icon_msg:"",
          icon_badge:0,
          icon_color: "#2d2d2d",
          icon_size: 28,
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.icon{
  div{
    font-size: var(--font-size);
    margin-top: -3px;
  }
}
</style>