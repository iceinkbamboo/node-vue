<template>
  <div class="index">
    <input v-model="firstName" />
    <input v-model="lastName" />
    <div class="fullName">{{fullName}}</div>
    <div v-for="item in examList" v-bind:key="item">{{item}}</div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'index',
  data () {
    return {
      firstName: 'jim',
      lastName: 'blank',
      examList: []
    }
  },
  computed: {
    fullName: function () {
      return this.firstName + this.lastName
    }
  },
  created () {
    var that = this
    axios.get('http://localhost:3000/getExamList', {}).then(function (response) {
      var data = response.data
      that.examList = data
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index{
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    input{
      width: 200px;
      height: 50px;
      border: 1px solid #cccccc;
    }
    .fullName{
      width: 2rem;
      height: 0.5rem;
      background: #ff8770;
    }
  }
</style>
