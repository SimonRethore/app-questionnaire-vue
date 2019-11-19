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
Vue.config.silent = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

var SRdb = new PouchDB('app_questionnaire_vue')

// Destruction de la BDD
// SRdb.destroy()

// Vérif si l'utilisateur admin est créé, si non le créé
SRdb.get('1').then(function (SRdoc) {
}).catch(SRe => {
  if (SRe.error === true) {
    SRdb.put({
      _id: '1',
      username: 'admin',
      password: 'admin'
    })
  }
})
