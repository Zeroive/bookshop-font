<template>
  <Navbar>
    <template #default>
      地址管理
    </template>
  </Navbar>

  <van-address-list
    v-model="chosenAddressId"
    :list="addressList"
    :disabled-list="disabledList"
    :disabled-text="tipText"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
  />
  <van-popup v-model:show="isPopShow" round :close-on-click-overlay="false" :closeable="true" style="width: 80%">
    <van-address-edit
      ref="addressEdit"
      :address-info="popupAddress"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @close="closePop"
    />
  </van-popup>
  

</template>

<script>
import Navbar from "@/components/navbar/NavbarComponent"
import {areaList} from '@vant/area-data';
import request from '@/network/request';
import addressTools from "@/utils/addressTools"

export default {
  data(){
    return {
      chosenAddressId: 0,
      addressList:[],
      disabledList:[],
      isPopShow:false,
      areaList: [],
      popupAddress: {}
    }
  },
  components:{
    Navbar
  },
  methods:{
    onAdd(){
      this.isPopShow = true
    },
    onSave(item){
      this.isPopShow = false
      let url = ""
      let data = {}
      if(this.popupAddress=={}){
        url = "/address/update"
        data = addressTools.vantAddress_to_dbAddress(-1, this.$store.state.user.userId, item)
      }else{
        url = "/address/add"
        data = addressTools.vantAddress_to_dbAddress(this.popupAddress.id, this.$store.state.user.userId, item)
      }
      request({
        url: url,
        method: "post",
        data: data
      }).then(res=>{
        if(res.code == 200){
          this.$toast.success("保存成功")
          this.addressList = addressTools.dbAddress_to_vantAddress(res.data)
        }
      }).catch(err =>{
        this.$toast.success(err)
      })

    },
    onDelete(){
      this.isPopShow = false
      request({
        url: "/address/delete",
        method: "post",
        data: {
          'id': this.popupAddress.id,
          'userId': this.$store.state.user.userId
        }
      }).then(res=>{
        if(res.code == 200){
          this.$toast.success("删除成功")
          this.addressList = addressTools.dbAddress_to_vantAddress(res.data)
        }
      }).catch(err =>{
        this.$toast.success(err)
      })
    },
    onEdit(item, index){
      this.isPopShow = true
      this.popupAddress = this.addressList[index]
    },
    closePop(){
      this.popupAddress = {}
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
    request({
      url:"/address/all",
      method:"post",
      data:{
        userId: '104'
      }
    }).then(res=>{
      this.addressList = addressTools.dbAddress_to_vantAddress(res.data)
    }).catch(error=>{
      console.log(error);
    })
  }
}
</script>

<style lang="scss" scoped>
.van-address-list{
  margin-top: 50px;
}
</style>
