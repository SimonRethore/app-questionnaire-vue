<template>
  <div>
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-10 text-center m-auto">
            <p class="libelle-form">Connexion</p>

            <div v-if="SRerrors.length > 0">
                <b-alert show variant="danger" v-for="SRerror in SRerrors" v-bind:key="SRerror">{{ error }}</b-alert>
            </div>

            <!-- <form id="app" @submit="checkForm" action="/home" method="post"> -->
                <b-form-input v-model="SRusername" class="text-center my-3" placeholder="Nom d'utilisateur"></b-form-input>
                <b-form-input v-model="SRpassword" type="password" class="text-center my-3" placeholder="Mot de passe"></b-form-input>
                <b-button @click="SRcheckForm" type="submit" variant="light" class="button-form w-100">Valider</b-button>
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

import SRPouchDB from 'pouchdb'

export default {
  name: 'SRAdmin',

  data () {
    return {
      SRerrors: [], // Variable contenant les errors
      SRusername: '', // Variable contenant le username
      SRpassword: '' // Variable contenant le password
    }
  },

  methods: {
    // Méthode permettant de checker que le formulaire a été remplit correctement
    SRcheckForm: function () {
      var SRcontext = this

      const SRform_username = this.SRusername
      const SRform_password = this.SRpassword

      this.SRerrors = []

      var SRdb = new SRPouchDB('app_questionnaire_vue')

      // Vérification champs remplit
      if (SRform_username == '') {
        this.SRerrors.push("Nom d'utilisateur requis.")
      }
      if (SRform_password == '') {
        this.SRerrors.push('Mot de Passe requis.')
      }

      // Charge les données de l'utilisateur admin
      SRdb.get('1').then(function (SRdoc) {
        if (SRcontext.SRerrors.length == 0) {
          if (SRdoc.username != SRform_username || SRdoc.password != SRform_password) {
            SRcontext.SRerrors.push('Connexion échouée.')
          }
          // Vérification username et password valide
          if (SRdoc.username == SRform_username && SRdoc.password == SRform_password) {
            // Changement de page vers Classement
            SRcontext.$router.push({ name: 'classement' })
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
