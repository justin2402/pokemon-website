import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueTilt from 'vue-tilt.js'
import { firestorePlugin } from 'vuefire'
Vue.use(VueTilt)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
