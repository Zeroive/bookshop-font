<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="加载中"
      @load="onLoad"
      :offset="50"
      :immediate-check="false"
    >
    <div class="goods-list">
      <GoodsItem v-for="(item, index) in goodlist" :key="index" :item="item"></GoodsItem>
    </div>
  </van-list>
</template>

<script>
import GoodsItem from "@/components/content/goods/GoodsItem";
import request from '@/network/request'

export default {
  name: "GoodList",
  props:{
    tabIndex:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data(){
    return{
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      goodlist : []
    }
  },
  components:{
    GoodsItem,
  },
  methods:{
    onLoad(){
      this.pageNum += 1
      this.getGoodList()
    },
    getGoodList(){
      request({
        url:"/goods/page",
        method:"get",
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res=>{
        if(res.records != null){
          this.goodlist = [...this.goodlist, ...res.records.map(val=>{return{
            "id":val.goodsId,
            "number":val.number,
            "title":val.name,
            "price":val.price,
            "tags":[],
            "thumb":val.imgUrl,
            "goodsId": val.goodsId
          }})]
          this.loading = false
          if(this.pageNum*this.pageSize >= res.total){
            this.finished = true
          }
        }
      }).catch(error=>{
        console.log(error);
        this.loading = false
        this.finished = true
      })
    }
    
  },
  mounted(){
    this.getGoodList()
  }
}
</script>

<style scoped>


.goods-list{
  display: flex;
  /*自动换行*/
  flex-wrap: wrap;
  padding: 5px;
  
  /*四周环绕*/
  justify-content: space-around;
  margin: 0px 5px 0px 5px;
  border-radius: 5px;
}
</style>