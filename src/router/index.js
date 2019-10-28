import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inscription from '../views/Inscription.vue'
import Questionnaire from '../views/Questionnaire.vue'
import Admin from '../views/Admin.vue'
import Resultats from '../views/Resultats.vue'

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
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/resultats',
    name: 'resultats',
    component: Resultats
  }
]

const router = new VueRouter({
  routes
})

export default router
