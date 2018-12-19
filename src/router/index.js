import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import topicList from '@/components/topicList'
import topic from '@/components/topic'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/topicList/:type',
      name: 'topicList',
      component: topicList
    },
    {
      path: '/topic/:examid',
      name: 'topic',
      component: topic
    }
  ]
})
