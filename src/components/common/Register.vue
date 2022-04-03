<template>
<div>
  <NavbarComponent>
    <template v-slot:default>新用户注册</template>
  </NavbarComponent>
  <div style="padding-top: 45px">
    <div style="padding-top: 45px">
      <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <div>
      <van-form @submit="onSubmit" :rules="fromRules">
        <van-cell-group inset>
          <van-field
              v-model="userInfo.username"
              name="username"
              label="用户名"
              placeholder="用户名"
              :rules="fromRules.username"
          />
          <van-field
              v-model="userInfo.password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="fromRules.password"
          />
          <van-field
              v-model="userInfo.password_confirm"
              type="password"
              name="password_confirm"
              label="确认密码"
              placeholder="确认密码"
              :rules="fromRules.password_confirm"
          />
          <van-field
              v-model="userInfo.email"
              name="email"
              label="电子邮箱"
              placeholder="电子邮箱"
              :rules="fromRules.email"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <div class="link-login" @click="toLogin">已有账户，去登录</div>
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</div>
</template>

<script>
import NavbarComponent from "@/components/navbar/NavbarComponent";
import request from "@/network/request"
export default {
  name: "Register",
  components: {NavbarComponent},
  data(){
    return{
      userInfo:{
        username:'',
        password:'',
        password_confirm:'',
        email:''
      },
      fromRules:{
        username: [
          { required: true, message: '请填写用户名' }
        ],
        password: [
          { required: true, message: '请填写密码' }
        ],
        password_confirm: [
          { required: true, message: '请确认密码' },
          {validator: () => {return this.userInfo.password == this.userInfo.password_confirm}, message: '两次密码不一致'}
        ],
        email: [
          { required: true, message: '请填写电子邮箱' },
          {validator: value => /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(value), message: '请输入正确的邮箱'}
        ]
      }
    }
  },
  methods:{
    onSubmit(){
      this.$toast.success('注册成功')

    },
    toLogin(){
      this.$router.push('/')
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