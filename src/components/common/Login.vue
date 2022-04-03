<template>
  <div>
    <NavbarComponent>
      <template v-slot:left>&nbsp;</template>
      <template v-slot:default>登录</template>
    </NavbarComponent>
    <div style="padding-top: 220px">
      <van-form @submit="onLogin">
        <van-cell-group inset>
          <van-field
              v-model="userInfo.username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="userInfo.password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <div class="link-login" @click="toRegister">没有账户，去注册</div>
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>

</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import request from "@/network/request"
export default {
  name: "Login",
  components: {NavbarComponent},
  data(){
    return{
      userInfo:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    onLogin(){
      request({
        method: "post",
        url: "/user/login",
        data:{
          userName: this.userInfo.username,
          password: this.userInfo.password
        }
      }).then(res => {
        if(res.code == 200){
          this.$store.dispatch('Login',this.userInfo.username)
          this.$router.push('/home')
          this.$toast.success('欢迎你'+this.userInfo.username)
        }else{
          this.$toast.fail(res.msg)
        }
        
      }).catch(err => {
        console.log("fail");
        this.$toast.fail('登录失败')
      })
    },
    toRegister(){
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="scss">
.link-login{
  color: var(--color-tint);
  margin-bottom: 20px;
  font-size: var(--font-size);
}
</style>