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
      myAnswer: []
    }
  },
  created () {
    let that = this
    this.examid = this.$route.params.examid
    axios.get('http://localhost:3000/topic?examid=' + that.examid).then(function (response) {
      var data = response.data
      that.topic = data
    }).catch(function (error) {
      console.log(error)
    }).then(function () {
    })
  },
  methods: {
    next: function (examid) {
      let len = this.topic.length
      let topicIndex = this.topicIndex
      if (topicIndex === len) {
        return false
      }
      this.myAnswer.push(this.selectOption)
      if (topicIndex === len - 1) {
        // 试卷完成
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
