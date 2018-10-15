<template>
  <div class="login">
    <div class="login_bg">
      <img v-bind:src="images.login_banner" />
    </div>
    <el-form class="formDiv">
      <el-input v-model="account" placeholder="请输入账号" clearable @blur="verifyAccount"></el-input>
      <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
      <el-input v-if="userStatus == 2" v-model="re_password" type="password" placeholder="请确认密码"></el-input>
      <el-button v-if="userStatus == 1" type="primary" @click="login">登录</el-button>
      <el-button v-else type="primary" @click="regist">注册</el-button>
    </el-form>
    <div class="tip">请输入账号、密码完成登录或注册</div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'login',
  data () {
    return {
      images: {
        login_banner: '../../static/images/login_banner.png'
      },
      account: '',
      password: '',
      re_password: '',
      userStatus: 1, // 用户状态，1登陆，2注册
      centerDialogVisible: true
    }
  },
  created () {
    if (localStorage.userid) {
      this.$router.push('/index')
    }
  },
  methods: {
    // 登录
    login: function () {
      var that = this
      axios.post('http://localhost:3000/login', {
        account: that.account,
        password: that.password
      }).then(function (response) {
        var data = response.data
        if (data.stat === 1) {
          localStorage.userid = data.data.userid
          that.$router.push('/index')
        }
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    },
    // 验证账户
    verifyAccount: function () {
      if (this.account === '') {
        console.log('请输入账号')
        this.alertTip('提示', '请输入账号')
        return
      }
      var that = this
      axios.post('http://localhost:3000/verifyAccount', {
        account: that.account
      }).then(function (response) {
        var data = response.data
        if (data.stat === 1) {
          that.userStatus = data.data.userStatus
        }
      }).catch(function (error) {
        console.log(error)
      }).then(function () {
      })
    },
    // 注册
    regist: function () {
      if (this.account === '') {
        console.log('请输入账号')
        return
      }
      if (this.password === '') {
        console.log('请输入密码')
        return
      }
      if (this.password === this.re_password) {
        var that = this
        axios.post('http://localhost:3000/regist', {
          account: that.account,
          password: that.password
        }).then(function (response) {
          var data = response.data
          if (data.stat === 1) {
            localStorage.userid = that.account
            that.$router.push('/index')
          }
        }).catch(function (error) {
          console.log(error)
        }).then(function () {
        })
      } else {
        console.log('密码不一致')
      }
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
    .login_bg{
      margin: 0 atuo;
      width: 5.04rem;
      height: 3.7rem;
      margin-top: 0.6rem;
      margin-bottom: 0.7rem;
      img{
        width: 5.04rem;
        height: 3.7rem;
      }
    }
    .formDiv{
      .el-input{
        width: 5.8rem;
      }
      .el-button{
        width: 5.8rem;
        height: 0.88rem;
        font-size: 0.36rem;
        background: linear-gradient(to right, #FF0021, #FF6E24);
        border: 0;
        margin-top: 0.62rem;
      }
    }
    .tip{
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.24rem;
      text-align: center;
      color: #327AF1;
    }
  }
</style>
