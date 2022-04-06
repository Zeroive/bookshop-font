<template>
  <!-- 头部 -->
  <Navbar>
    <template #default>
      地址管理
    </template>
  </Navbar>

  <!-- 地址列表 -->
  <van-address-list
    v-model="chosenAddressId"
    :list="addressList"
    :disabled-list="disabledList"
    :disabled-text="tipText"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
  />

  <!-- 添加地址弹出窗口 -->
  <van-popup v-model:show="isPopShow" @close="closePop" round :close-on-click-overlay="false" :closeable="true" style="width: 80%">
    <van-address-edit
      ref="addressEdit"
      :address-info="popupAddress"
      :area-list="areaList"
      show-postal
      show-delete
      :delete-button-text="deleteButtonText"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </van-popup>

  <van-button @click="confirmAddress" class="confirmAddress" color="linear-gradient(to right, #ff6034, #ee0a24)" round>完成</van-button>

</template>

<script>
import Navbar from "@/components/navbar/NavbarComponent"
import {areaList} from '@vant/area-data';
import request from '@/network/request';
import addressTools from "@/utils/addressTools"

export default {
  data(){
    return {
      chosenAddressId: -1, //当前选择的地址Id
      addressList:[], //地址列表
      disabledList:[], //不可送达地址列表
      isPopShow:false, //是否弹出
      areaList: [], //地址列表
      popupAddress: {}, //弹出框的信息
      isAddAddress: false, //是否是添加地址
      deleteButtonText: "删除" //弹出框按钮文案
    }
  },
  components:{
    Navbar
  },
  methods:{
    // 添加地址
    onAdd(){
      this.deleteButtonText = "取消"
      this.isAddAddress = true
      this.isPopShow = true
    },
    // 保存地址、修改地址
    onSave(item){
      this.isPopShow = false
      let url = ""
      let data = {}
      // 根据isAddAddress来判断是添加还是更新
      if(this.isAddAddress){
        this.deleteButtonText = "取消"
        url = "/address/add"
        data = addressTools.vantAddress_to_dbAddress(-1, this.$store.state.user.userId, item)
      }else{
        this.deleteButtonText = "删除"
        url = "/address/update"
        data = addressTools.vantAddress_to_dbAddress(this.popupAddress.id, this.$store.state.user.userId, item)
      }
      // 发送请求
      this.getRequest(
        url,
        data,
        (data)=>{
          this.$toast.success("保存成功")
          this.addressList = addressTools.dbAddress_to_vantAddress(data)
        }
      )
    },
    // 删除地址
    onDelete(){
      this.isPopShow = false
      // 根据isAddAddress判断是添加还是修改
      if(!this.isAddAddress){
        this.getRequest(
          "/address/delete",
          {
            'id': this.popupAddress.id,
            'userId': this.$store.state.user.userId
          },
          (data)=>{
            this.$toast.success("删除成功")
            this.addressList = addressTools.dbAddress_to_vantAddress(data)
          }
        )
      }
      this.popupAddress = {}
    },
    // 修改地址
    onEdit(item, index){
      this.popupAddress = this.addressList[index]
      this.isPopShow = true
    },
    // 关闭弹出框
    closePop(){
      this.popupAddress = {}
      this.isAddAddress = false
    },
    // 获取请求
    getRequest(url, data, func=null){
      request({
        url: url,
        method: "post",
        data: data
      }).then(res=>{
        if(res != null && res.code == 200){
          func(res.data)
        }
      }).catch(error=>{
        console.log(error);
      })
    },
    confirmAddress(){
      this.$router.go(-1)
      localStorage.setItem('chosenAddressId', this.chosenAddressId)
    }
  },
  computed:{
    tipText:{
      set(){
        // 设置字符串是否显示
        return this.disabledList.length == 0 ? "":"以下地址超出配送范围"
      },
      get(nVal){

      }
    }
  },
  mounted(){
    this.areaList = areaList
    // 初始化列表
    this.getRequest(
      "/address/all",
      {userId: this.$store.state.user.userId},
      (data)=>{this.addressList = addressTools.dbAddress_to_vantAddress(data)}
    )
  }
}
</script>

<style lang="scss" scoped>
.van-address-list{
  margin-top: 50px;
}
.confirmAddress{
  position: fixed;
  transform: translate(-50%);
  bottom: 50px;
  width: 90%;
}
</style>
