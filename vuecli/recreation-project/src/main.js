import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import '@/assets/js/rem.js'
import '@/assets/js/vue.js'
import APlayer from '@moefe/vue-aplayer';


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});