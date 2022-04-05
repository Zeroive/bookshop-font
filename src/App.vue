<template>
  <router-view/>
</template>

<script>

export default ({
  mounted(){
    this.$store.state.cart.goodlist = [{
      id:'1',
      num:1,
      price:32.80,
      desc:"这是描述信息",
      title:"细说PHP1",
      tags:["新品", "上市"],
      checked:false,
      value:1,
      thumb: "recommend1.png"
    },
    {
      id:'2',
      num:1,
      price:32.80,
      desc:"这是描述信息",
      title:"细说PHP2",
      tags:["新品", "上市"],
      checked:false,
      value:1,
      thumb: "recommend1.png"
    },
    {
      id:'3',
      num:1,
      price:32.80,
      desc:"这是描述信息",
      title:"细说PHP3",
      tags:["新品", "上市"],
      checked:false,
      value:1,
      thumb: "recommend1.png"
    },
    {
      id:'4',
      num:1,
      price:32.80,
      desc:"这是描述信息",
      title:"细说PHP4",
      tags:["新品", "上市"],
      checked:false,
      value:1,
      thumb: "recommend1.png"
    }]
  }
})
</script>


<style lang="scss">
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
