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

db.put({
  _id: '1',
  username: 'admin',
  password: 'admin'
})

// db.get('1').then(function (doc){
//   console.log(doc);
// }).catch(function (err){
//   console.log(err);
// })
