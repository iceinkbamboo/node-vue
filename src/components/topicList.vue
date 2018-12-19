<template>
  <div class="topic-list">
    <div class="topic-list-content">
      <div class="topic-list-item" @click="toTopic(item.examid)" v-for="(item, index) in exam" :key="index">{{examName[type-1] + '' + (index + 1)}}</div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'topicList',
  data () {
    return {
      type: null,
      exam: null,
      examName: ['听后选择', '听后回答', '听后跟读', '短文朗读']
    }
  },
  created () {
    let that = this
    // 接收route params传参
    this.type = parseInt(this.$route.params.type)
    axios.get('http://localhost:3000/exam?type=' + that.type).then(function (response) {
      var data = response.data
      that.exam = data
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
    })
  },
  methods: {
    toTopic: function (examid) {
      this.$router.push({name: 'topic', params: {examid: examid}})
    }
  }
}
</script>

<style lang="less" scoped>
  .topic-list{
    width: 100%;
    height: 100%;
    padding: 0.3rem 0.2rem;
    box-sizing: border-box;
    font-size: 0.24rem;
    .topic-list-content{
      width: 100%;
      height: 100%;
      border: 1px solid #cccccc;
      border-radius: 0.1rem;
      box-sizing: border-box;
      padding: 0 0.2rem;
      .topic-list-item{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: left;
        border-bottom: 1px solid #F1F1F1;
      }
    }
  }
</style>
