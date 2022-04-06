<template>
  <van-skeleton class="Mskeleton"  v-show="!loadfinished" :row="9" />
  <div v-show="loadfinished">
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
        <GoodsItem v-for="(item, index) in goodlist" :key="index" :item="item"
        @click="goDetail(item.id)" ></GoodsItem>
      </div>
    </van-list>
  </div>
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
      loadfinished: false,
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 10,
      goodlist : [],
      totalPage: 0
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
    goDetail(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    },
    getGoodList(flag=false){
      request({
        url:"/goods/page",
        method:"get",
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res=>{
        if(res != null && res.records != null){
          // 根据flag判断是否切换Tab，true时候直接替换，false拼接
          if(flag)
            this.goodlist = res.records.map(val=>{return{
              "id":val.id,
              "number":val.number,
              "title":val.name,
              "price":val.price,
              "tags":[],
              "thumb":val.imgUrl
            }})
          else
            this.goodlist = [...this.goodlist, ...res.records.map(val=>{return{
              "id":val.id,
              "number":val.number,
              "title":val.name,
              "price":val.price,
              "tags":[],
              "thumb":val.imgUrl
            }})]
          this.totalPage = res.total
          this.loadfinished = true
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
    },
    changeTab(){
      this.pageNum = Math.round(Math.random()*(this.totalPage/this.pageSize))
      this.getGoodList(true)
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

.Mskeleton{
  margin-top: 20px;
}


</style>