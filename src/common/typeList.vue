<template>
  <div class="list">
    <div class="list-img">
      <img v-if="item.type == 1" :src="images.choose" />
      <img v-if="item.type == 2" :src="images.answer" />
      <img v-if="item.type == 3" :src="images.read" />
      <img v-if="item.type == 4" :src="images.essay" />
    </div>
    <div class="list-content">
    </div>
  </div>
</template>

<script>
export default{
  name: 'typeList',
  props: ['item'],
  data () {
    return {
      images: {
        'choose': '../../static/images/choose.png',
        'answer': '../../static/images/answer.png',
        'read': '../../static/images/read.png',
        'essay': '../../static/images/essay.png'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .list{
    width: 6.7rem;
    height: 2.24rem;
    display: flex;
    flex-direction: row;
    .list-img{
      width: 2.6rem;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .list-content{
      width: 4.1rem;
      height: 100%;
    }
  }
</style>
