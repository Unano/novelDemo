<template>
  <div class="mask"  v-if="visible">
    <div class="contain">
      <form>
        <div><div class="logo"><img src="../assets/logo.png" /></div></div>
        <div class="common-input">
          <label>账号：</label>
          <input type="text" v-model="account" />
        </div>
        <div class="common-input">
          <label>密码：</label>
          <input type="password" v-model="password"/>
        </div>
        <div class="common-input">
          <label>确认密码：</label>
          <input type="password" v-model="confirmPassword"/>
        </div>
        <div class="footer">
          <span class="common-button" @click="register">注册</span>
          <span class="common-button" @click="cancle">取消</span>
        </div>
      </form>
      <div class="close" @click="close">X</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  props: ['visible'],
  data () {
    return {
      account: '',
      password: '',
      confirmPassword: ''
    }
  },
  created: function () {
  },
  methods: {
    login () {

    },
    cancle () {
    },
    close () {
      this.$emit('close')
    },
    register () {
      let params = {
        account: this.account,
        password: this.password
      }
      this.axios.post('/users/register', params).then((response) => {
        let res = response.data
        if (res.status === '0') {
          alert('注册成功')
        } else {
          let msg = res.msg
          alert(msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.contain {
  position: relative;
  width: 447px;
  height: 317px;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
  background-color: #fff;
  form {
    width: 371px;
    margin: 0 auto;
  }
}
.common-input {
  width: 350px;
  margin: 10px 0;
  label {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
.logo {
  text-align: center;
  padding: 10px 0;
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
