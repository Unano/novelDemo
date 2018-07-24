<template>
  <div class="mask"  v-if="visible">
    <div class="contain">
      <form>
        <div class="header">
          <div class="logo"><img src="../assets/logo.png" /></div>
          <p class="tip" v-show="tip">*账号或密码不正确</p>
        </div>
        <div class="common-input">
          <label>账号：</label>
          <input type="text" v-model="account" />
        </div>
        <div class="common-input">
          <label>密码：</label>
          <input type="password" v-model="password"/>
        </div>
        <div class="footer">
          <span class="common-button" @click="login">登录</span>
          <span class="common-button" @click="cancle">取消</span>
        </div>
      </form>
      <div class="close" @click="close">X</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  props: ['visible'],
  data () {
    return {
      account: '',
      password: '',
      tip: false
    }
  },
  created: function () {
  },
  methods: {
    login () {
      let params = {
        account: this.account,
        password: this.password
      }
      this.axios.post('/users/login', params).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.tip = false
          this.$emit('success', res.result.account)
          this.close()
        } else {
          this.tip = true
        }
      })
    },
    cancle () {
      this.close()
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.contain {
  position: relative;
  width: 447px;
  height: 255px;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  background-color: #fff;
  form {
    width: 325px;
    margin: 0 auto;
  }
}
.common-input {
  margin: 10px 0;
}
.header {
  .tip {
    font-size: 13px;
    color: red;
  }
}
.logo {
  text-align: center;
  padding-top: 10px;
  img {
    width: 60px;
  }
}
.close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
  text-align: center;
  font-size: 13px;
  border-radius: 10px;
  cursor: pointer;
}
.close:hover {
  background-color: #ccc;
  color: #fff;
}
.footer {
  margin-top: 33px;
  text-align: center;
}
.common-button {
  margin-left: 20px;
}
</style>
