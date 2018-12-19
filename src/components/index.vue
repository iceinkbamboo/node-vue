<template>
  <div class="index">
    <div class="list" v-for="item in examList" v-bind:key="item.type" @click="toTopicList(item.type)">
      <type-list v-bind:item="item"></type-list>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
// 引入自定义npm方法
// const bamboo = require('ink-bamboo-cli')
export default {
  name: 'index',
  data () {
    return {
      examList: []
    }
  },
  computed: {
    fullName: function () {
      return this.firstName + this.lastName
    }
  },
  created () {
    // 调用自定义npm方法
    // let message = bamboo.timeout('hello')
    // let time = bamboo.dateConversion(2412412)
    var that = this
    axios.get('http://localhost:3000/getExamList', {}).then(function (response) {
      var data = response.data
      that.examList = data
    }).catch(function (error) {
      console.log(error)
    }).finally(function () {
    })
  },
  methods: {
    toTopicList: function (type) {
      this.$router.push({name: 'topicList', params: {type: type}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index{
    width:100%;
    height:100%;
    margin-top: 1.2rem;
    .list{
      width: 6.7rem;
      height: 2.24rem;
      border-radius: 0.1rem;
      margin: 0 auto;
      box-shadow: 0.1rem 0.1rem 0.5rem #D8D8D8;
      margin-bottom: 0.2rem;
    }
  }
</style>
