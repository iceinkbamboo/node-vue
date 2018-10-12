<template>
  <div class="login">
    <div class="input-div">
      <el-input v-model="account" placeholder="请输入账号"></el-input>
    </div>
    <div class="input-div">
      <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
    </div>
    <div class="loginBtn">
      <el-button type="success" round @click="login">成功按钮</el-button>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  created () {
    if (localStorage.userid) {
      this.$router.push('/index')
    }
  },
  methods: {
    login: function () {
      var that = this
      console.log(that.account, that.password)
      axios.post('http://localhost:3000/login', {
        name: that.account,
        password: that.password
      }).then(function (response) {
        console.log(response)
        var data = response.data
        if (data.stat === 1) {
          localStorage.userid = data.data.userid
          that.$router.push('/index')
          console.log(localStorage.userid)
        }
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login{
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .input-div{
      width: 200px;
      el-input{
        background: #ffffff;
      }
    }
  }
</style>
