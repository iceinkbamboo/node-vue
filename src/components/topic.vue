<template>
  <div v-if="topic" class="topic">
    <div class="topic-top">题目{{topicIndex + 1}}</div>
    <div class="topic-content">
      <div class="topic-content-title">{{topic[topicIndex].tem}}</div>
      <div class="topic-content-option" :class="[selectOption == 'A' ? 'select' : 'noselect']" @click="select('A')">A {{topic[topicIndex].option1}}</div>
      <div class="topic-content-option" :class="[selectOption == 'B' ? 'select' : 'noselect']" @click="select('B')">B {{topic[topicIndex].option2}}</div>
      <div class="topic-content-option" :class="[selectOption == 'C' ? 'select' : 'noselect']" @click="select('C')">C {{topic[topicIndex].option3}}</div>
    </div>
    <div class="topic-bottom">
      <div class="topic-bottom-next" @click="next">{{buttonText}}</div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default{
  name: 'topic',
  data () {
    return {
      examid: null,
      topic: null,
      topicIndex: 0, // 当前题目的序号
      buttonText: '下一题',
      selectOption: '',
      result: []
    }
  },
  created () {
    let that = this
    this.examid = this.$route.params.examid
    axios.get('http://localhost:3000/topic?examid=' + that.examid).then(function (response) {
      var data = response.data
      that.topic = data
      that.buttonText = data.length > 1 ? '下一题' : '提交答案'
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
    })
  },
  methods: {
    next: function (examid) {
      var that = this
      let len = this.topic.length
      let topicIndex = this.topicIndex
      // 计算结果
      let score = 0
      if (this.selectOption === this.topic[topicIndex].answer) {
        score = 10
      }
      let answer = {
        topicid: this.topic[topicIndex].topicid,
        answer: this.topic[topicIndex].answer,
        myAnswer: this.selectOption,
        score: score
      }
      this.result.push(answer)
      if (topicIndex === len - 1) {
        // 试卷完成
        let score = 0
        for (let i = 0; i < this.result.length; i++) {
          score += this.result[i].score
        }
        console.log(localStorage.userid, this.examid, this.result, score)
        axios.post('http://localhost:3000/answer', {
          userid: localStorage.userid,
          examid: that.examid,
          result: JSON.stringify(that.result),
          score: score
        }).then(function (response) {
          var data = response.data
          console.log(data)
          if (data.stat === 1) {
            // 提交成功，跳转到结果页
            that.$router.push({name: 'result', params: {examid: that.examid}})
          }
        }).catch(function (error) {
          console.log(error)
        }).then(function () {
        })
        return false
      }
      if (topicIndex === len - 2) {
        // 试卷最后一题
        this.buttonText = '提交试卷'
      }
      this.selectOption = ''
      this.topicIndex++
    },
    select: function (option) {
      this.selectOption = option
    }
  }
}
</script>

<style lang="less" scoped>
  .topic{
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    .topic-top{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #000000;
      font-size: 0.28rem;
      border-bottom: 1px solid #cccccc;
    }
    .topic-content{
      width: 100%;
      height: 100%;
      padding-top: 1rem;
      box-sizing: border-box;
      .topic-content-title{
        margin: 0.6rem 0 0.4rem 0;
      }
      .topic-content-option{
        width: 6.3rem;
        padding-left: 0.4rem;
        min-height: 1rem;
        line-height: 1rem;
        margin: 0 auto;
        border-radius: 0.1rem;
        margin-bottom: 0.1rem;
        text-align: left;
      }
      .select{
        border: 1px solid #ff6600;
      }
      .noselect{
        border: 1px solid #F1F1F1;
      }
    }
    .topic-bottom{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      background: #F1F1F1;
      .topic-bottom-next{
        height: 100%;
        float: right;
        margin-right: 0.72rem;
      }
    }
  }
</style>
