<template>
<div class="tab-control">
  <div class="tab-control-item" v-for="(item,index) in titles" :key="index" :class="{active:currentIndex==index}" @click="itemClick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped lang="scss">
.tab-control{
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #FFFFFF;
  line-height: 40px;
  text-align: center;
  font-size: var(--font-size);
  //当出现滚动条时，选择卡固定在标题栏下
  position: sticky;
  top: 45px;
  z-index: 9;


  .tab-control-item{
    flex: 1;
    span{
      padding: 6px;
    }
  }

  .active{
    span{
      border-bottom: 4px solid var(--color-tint);
    }
  }
}
</style>