import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/SRHome.vue'
import Inscription from '../views/SRInscription.vue'
import Questionnaire from '../views/SRQuestionnaire.vue'
import Admin from '../views/SRAdmin.vue'
import Resultats from '../views/SRResultats.vue'
import Classement from '../views/SRClassement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription
  },
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: Questionnaire
  },
  {
    path: '/resultats',
    name: 'resultats',
    component: Resultats
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/classement',
    name: 'classement',
    component: Classement
  }
]

const router = new VueRouter({
  routes
})

export default router
