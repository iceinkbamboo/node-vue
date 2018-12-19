import dateTime from './dateTime.vue'
import arithmetic from './arithmetic.vue'
import typeList from './typeList.vue'

const components = {
  install: function (Vue) {
    Vue.component('dateTime', dateTime)
    Vue.component('arithmetic', arithmetic)
    Vue.component('typeList', typeList)
  }
}

export default components
