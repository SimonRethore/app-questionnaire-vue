<template>
  <div>
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-10 text-center m-auto">
          <p class="libelle-form">Inscription</p>

          <div v-if="errors.length > 0">
            <b-alert show variant="danger" v-for="error in errors" v-bind:key="error">{{ error }}</b-alert>
          </div>

          <b-form-input v-model="prenom" class="text-center my-3" placeholder="Prénom"></b-form-input>
          <b-form-input v-model="nom" class="text-center my-3" placeholder="Nom"></b-form-input>
          <b-form-input v-model="societe" class="text-center my-3" placeholder="Société"></b-form-input>
          <b-button @click="checkForm" type="submit" variant="light" class="button-form w-100">Valider</b-button>

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
  name: 'Inscription',

  data () {
    return {
      errors: [],
      prenom: '',
      nom: '',
      societe: ''
    }
  },

  methods: {
    checkForm: function () {

      const DateInsert = Date.now().toString()

      var context = this

      const form_prenom = this.prenom
      const form_nom = this.nom
      const form_societe = this.societe

      this.errors = []

      var db = new PouchDB('app_questionnaire_vue')

      if (form_prenom == '') {
        this.errors.push("Prénom requis.")
      }
      if (form_nom == '') {
        this.errors.push('Nom requis.')
      }
      if (form_nom == '') {
        this.errors.push('Société requis.')
      }

      if(form_prenom != '' && form_nom != '' && form_societe != ''){
        db.put({
          _id: DateInsert,
          prenom: form_prenom,
          nom: form_nom,
          societe: form_societe
        })
        context.$router.push({ name: 'questionnaire', params: { userPrenom: form_prenom, userNom: form_nom, userSociete: form_societe } })
      }else{
        console.log('a')
        return false;
      }
    }
  }
}

</script>
