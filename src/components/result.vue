<template>
  <div class="result">
    <div class="result-title">结果页</div>
    <div class="result-content" v-if="exam && result">
      <div v-for="(item, index) in exam" :key="index">
        <div class="result-content-title">{{index+1}}、{{item.tem}}</div>
        <div class="result-content-option" :class="[result[index].score != 0 && item.answer === 'A' ? 'correct' : 'wrong']">{{item.option1}}</div>
        <div class="result-content-option" :class="[result[index].score != 0 && item.answer === 'B' ? 'correct' : 'wrong']">{{item.option2}}</div>
        <div class="result-content-option" :class="[result[index].score != 0 && item.answer === 'C' ? 'correct' : 'wrong']">{{item.option3}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'result',
  data () {
    return {
      examid: null,
      exam: null,
      result: null
    }
  },
  created () {
    let that = this
    this.examid = this.$route.params.examid
    console.log(this.examid)
    axios.post('http://localhost:3000/result', {
      userid: localStorage.userid,
      examid: that.examid
    }).then(function (response) {
      var data = response.data
      that.result = JSON.parse(data[0].results)
      console.log(data, data[0].results)
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
    })
    axios.get('http://localhost:3000/topic?examid=' + that.examid
    ).then(function (response) {
      var data = response.data
      that.exam = data
      console.log(data)
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
    })
  }
}
</script>

<style lang="less" scoped>
  .result{
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    .result-title{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      position: fixed;
      left: 0;
      top: 0;
      border-bottom: 1px solid #cccccc;
    }
    .result-content{
      width: 100%;
      height: 100%;
      padding-top: 1rem;
      box-sizing: border-box;
      .result-content-title{
        width: 6.7rem;
        margin: 0 auto;
        text-align: left;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
      }
      .result-content-option{
        width: 6.3rem;
        padding-left: 0.4rem;
        min-height: 1rem;
        line-height: 1rem;
        margin: 0 auto;
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;
        text-align: left;
      }
      .correct{
        border: 1px solid #1309de;
      }
      .wrong{
        border: 1px solid #ed370d;
      }
    }
  }
</style>
