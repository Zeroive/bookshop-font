<template>
  <router-view/>
</template>

<script>

export default ({
  mounted(){
    localStorage.setItem('chosenAddressId', -1)
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
