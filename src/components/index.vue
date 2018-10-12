<template>
  <div class="index">
    <input v-model="firstName" />
    <input v-model="lastName" />
    <div class="fullName">{{fullName}}</div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      firstName: 'jim',
      lastName: 'blank'
    }
  },
  computed: {
    fullName: function () {
      return this.firstName + this.lastName
    }
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
