import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import PouchDB from 'pouchdb/dist/pouchdb'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

var db = new PouchDB('app_questionnaire_vue')

const DateInsert = Date.now().toString()

db.put({
  _id: DateInsert,
  username: 'admin',
  password: 'admin'
})

db.get(DateInsert).then(function (doc) {
  console.log(doc)
})
