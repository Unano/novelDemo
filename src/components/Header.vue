<template>
  <div class="header">
    <div class="header-contain">
      <div class="logo"><img src="../assets/logo.png" /></div>
      <div class="person" v-if="!personInfo">
        <span class="common-button" @click="login">登录</span>
        <span class="common-button" @click="register">注册</span>
      </div>
      <div class="person" v-if="personInfo">
        <span>{{account}}</span>
        <span @click="logout">登出</span>
      </div>
    </div>
    <login :visible="loginVisible" @close="closeLogin" @success="loginSuccess"/>
    <register :visible="registerVisible" @close="closeRegister"/>
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'

export default {
  name: 'Header',
  data () {
    return {
      loginVisible: false,
      registerVisible: false,
      personInfo: false,
      account: ''
    }
  },
  components: {
    Login,
    Register
  },
  methods: {
    login () {
      this.loginVisible = true
    },
    logout () {
      this.axios.post('/users/logout').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.personInfo = false
          this.accpunt = null
        }
      })
    },
    register () {
      this.registerVisible = true
    },
    closeLogin () {
      this.loginVisible = false
    },
    closeRegister () {
      this.registerVisible = false
    },
    loginSuccess (val) {
      this.personInfo = true
      this.account = val
    }
  }
}
</script>

<style scoped lang="less">
.header {
  padding: 2px 0;
  background-color: rgba(197, 198, 236, 0.37);
}
.header-contain {
  width: 85vw;
  position: relative;
  margin: 0 auto;
}
.logo {
  display: inline-block;
  margin-left: 20px;
  img {
    width: 45px;
  }
}
.person {
  position: absolute;
  right: 0;
  top: 10px;
  display: inline-block;
}
</style>
