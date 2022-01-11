import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// /Users/momo/hpstream/code1/vue-cli-plugins/packages/vue-cli-plugin-cssPreprocessors

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
