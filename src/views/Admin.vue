<template>
  <div>
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-10 text-center m-auto">
            <p class="libelle-form">Connexion</p>

            <div v-if="errors.length > 0">
                <b-alert show variant="danger" v-for="error in errors" v-bind:key="error">{{ error }}</b-alert>
            </div>

            <!-- <form id="app" @submit="checkForm" action="/home" method="post"> -->
                <b-form-input v-model="username" class="text-center my-3" placeholder="Nom d'utilisateur"></b-form-input>
                <b-form-input v-model="password" type="password" class="text-center my-3" placeholder="Mot de passe"></b-form-input>
                <b-button @click="checkForm" type="submit" variant="light" class="button-form w-100">Valider</b-button>
            <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container-fluid{
        position: fixed;
        height: 100%;
        bottom: 0;
        width: 100%;
        background-color: #ffffc5;
    }

    .libelle-form{
        font-family: 'Bree Serif', serif;
        font-size: 30px;
        margin-bottom: 30px;
        color: #253054;
    }

    .button-form{
        background-color: #253054 !important;
        color: white !important;
    }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.5/vue.min.js%22%3E"></script>
<script>

import PouchDB from 'pouchdb'

export default {
  name: 'Admin',

  data () {
    return {
      errors: [],
      username: '',
      password: ''
    }
  },

  methods: {
    checkForm: function () {
      var context = this

      const form_username = this.username
      const form_password = this.password

      this.errors = []

      var db = new PouchDB('app_questionnaire_vue')

      if (form_username == '') {
        this.errors.push("Nom d'utilisateur requis.")
      }
      if (form_password == '') {
        this.errors.push('Mot de Passe requis.')
      }

      db.get('1').then(function (doc) {
        if (context.errors.length == 0) {
          if (doc.username != form_username || doc.password != form_password) {
            context.errors.push('Connexion échouée.')
          }

          if (doc.username == form_username && doc.password == form_password) {
            context.$router.push({ name: 'resultats' })
          } else {
            return false
          }
        } else {
          return false
        }
      })
    }
  }
}

</script>
