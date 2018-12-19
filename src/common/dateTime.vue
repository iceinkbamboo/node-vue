<template>
  <div class="main" @click="tip">
    {{info}}
  </div>
</template>
<script>
export default {
  name: 'dateTime',
  data () {
    return {
      info: 'hello'
    }
  },
  methods: {
    tip: function () {
      console.log('hello')
    }
  }
}
</script>
<style scoped>
  .main{
    font-size: 0.24rem;
    color: #ff8877;
  }
</style>
