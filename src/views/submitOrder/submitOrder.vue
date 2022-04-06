<template>
  <div>
    <navbar-component>提写订单</navbar-component>

    <van-cell class="Mcontact">
      <template #title>
        <div class="Mtitle">
          {{chosenAddress}}
        </div>
      </template>
      <template #label>
        <div class="Mlabel">
          {{chosenuser}}
        </div>
      </template>
    </van-cell>

    <TabBar></TabBar>
  </div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import TabBar from "@/components/common/TabBar.vue"
import request from '@/network/request'
import addressTools from "@/utils/addressTools"

export default {
  components:{
    NavbarComponent,
    TabBar
  },
  data(){
    return{
      chosenAddressId: 0,
      addressList:[],
      disabledList:[]
    }
  },
  methods:{
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
  },
  computed:{
    chosenAddress(){
      let str = ""
      this.addressList.filter(val=>{val.id == this.chosenAddressId?str=val.address:""})
      return str
    },
    chosenuser(){
      let name = ""
      let phone = ""
      this.addressList.filter(val=>{val.id == this.chosenAddressId?(name=val.name, phone=val.tel):""})
      return name + '  ' + phone.slice(0,3)+'****'+phone.slice(-4)
    }
  },
  mounted(){
    this.getRequest(
      "/address/all",
      {userId: this.$store.state.user.userId},
      (data)=>{
        this.addressList = addressTools.dbAddress_to_vantAddress(data)
        this.addressList.map(val=>{val.isDefault?(this.chosenAddressId=val.id):''})
      }
    )
  }

}
</script>

<style lang="scss" scoped>

.Mcontact{
  margin-top: 60px;
  font-size: 18px;
  
}

.Mtitle{
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
}

.Mlabel{
  text-align: left;
  font-size: 10px;
  letter-spacing: 1px;
}

.Mcontact:before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: repeating-linear-gradient(-80deg,var(--van-warning-color) 0,var(--van-warning-color) 20%,transparent 0,transparent 25%,var(--van-primary-color) 0,var(--van-primary-color) 45%,transparent 0,transparent 50%);
  background-size: 80px;
  content: "";
}


</style>