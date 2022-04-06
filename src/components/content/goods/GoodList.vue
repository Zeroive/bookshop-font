<template>
  <!-- 根据loadfinished是否显示骨架条 -->
  <van-skeleton class="Mskeleton"  v-show="!loadfinished" :row="9" />
  <div v-show="loadfinished">
    <!-- 分页加载 -->
    <van-list
        v-model:loading="loading" 
        :finished="finished"
        finished-text="没有更多了"
        loading-text="加载中"
        @load="onLoad"
        :offset="50"
        :immediate-check="false"
      >
      <!-- 展示商品 -->
      <div class="goods-list">
        <GoodsItem v-for="(item, index) in goodlist" :key="index" :item="item" @click="goDetail(item.id)" />
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
      loadfinished: false, // 是否加载
      loading: false, //是否加载
      finished: false, //是否全部加载完成
      pageNum: 1, //当前页数
      pageSize: 10, //每页显示条数
      goodlist : [], //商品列表
      totalPage: 0 // 总页数
    }
  },
  components:{
    GoodsItem,
  },
  methods:{
    // 加载 页数加一 请求商品
    onLoad(){
      this.pageNum += 1
      this.getGoodList()
    },
    // 跳转商品详情页
    goDetail(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    },
    // 获得商品数据 flag=true表示标签页切换请求新的商品列表
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
    // 切换标签页
    changeTab(){
      this.pageNum = Math.round(Math.random()*(this.totalPage/this.pageSize))
      this.getGoodList(true)
    }
    
  },
  mounted(){
    // 初始化商品列表
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