<template>
  <div class="recommend">
    <div class="recommendItem">
      <a href="#" @click.prevent="goDetail(1)">
        <img src="@/assets/images/recommend1.png">
        <div>细说PHP</div>
      </a>
    </div>
    <div class="recommendItem">
      <a href="#" @click.prevent="goDetail(2)">
        <img src="@/assets/images/recommend1.png">
        <div>细说PHP</div>
      </a>
    </div>
    <div class="recommendItem">
      <a href="#" @click.prevent="goDetail(3)">
        <img src="@/assets/images/recommend1.png">
        <div>细说PHP</div>
      </a>
    </div>
    <div class="recommendItem">
      <a href="#" @click.prevent="goDetail(4)">
        <img src="@/assets/images/recommend1.png">
        <div>细说PHP</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  methods:{
    goDetail(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    }
  }
  
}
</script>

<style scoped lang="scss">
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 30px;// 上 左右 下
  font-size: 13px;
  //border-bottom: 8px solid #EEE;
}
.recommendItem{
  flex: 1;

  img{
    width: 70px;
    height: 70px;
  }
}
</style>