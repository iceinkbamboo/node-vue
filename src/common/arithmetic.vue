<template>
  <div class="main" @click="tip">{{message}}</div>
</template>

<script>
export default {
  name: 'arithmetic',
  data () {
    return {
      message: 'world'
    }
  },
  methods: {
    tip: function () {
      console.log('world')
    }
  }
}
</script>

<style scoped>
  .main{
    font-size: 0.48rem;
    color: brown;
  }
</style>
