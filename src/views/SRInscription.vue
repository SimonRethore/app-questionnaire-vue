<template>
  <div>
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-10 text-center m-auto">
          <p class="libelle-form">Inscription</p>

          <div v-if="SRerrors.length > 0">
            <b-alert show variant="danger" v-for="SRerror in SRerrors" v-bind:key="SRerror">{{ SRerror }}</b-alert>
          </div>

          <b-form-input v-model="SRprenom" class="text-center my-3" placeholder="Prénom"></b-form-input>
          <b-form-input v-model="SRnom" class="text-center my-3" placeholder="Nom"></b-form-input>
          <b-form-input v-model="SRsociete" class="text-center my-3" placeholder="Société"></b-form-input>
          <b-button @click="SRcheckForm" type="submit" variant="light" class="button-form w-100">Valider</b-button>

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
  name: 'Inscription',

  data () {
    return {
      SRerrors: [], // Variable contenant les errors
      SRprenom: '', // Variable contenant le prénom
      SRnom: '', // Variable contenant le nom
      SRsociete: '' // Variable contenant la société
    }
  },

  methods: {
    // Méthode permettant de checker que le formulaire a été remplit correctement
    SRcheckForm: function () {

      const SRDateInsert = Date.now().toString()

      var SRcontext = this

      const SRform_prenom = this.SRprenom
      const SRform_nom = this.SRnom
      const SRform_societe = this.SRsociete

      this.SRerrors = []

      var SRdb = new SRPouchDB('app_questionnaire_vue')

      // Vérification champs remplit
      if (SRform_prenom == '') {
        this.SRerrors.push("Prénom requis.")
      }
      if (SRform_nom == '') {
        this.SRerrors.push('Nom requis.')
      }
      if (SRform_nom == '') {
        this.SRerrors.push('Société requis.')
      }

      // Insertion des données d'inscription
      if(SRform_prenom != '' && SRform_nom != '' && SRform_societe != ''){
        SRdb.put({
          _id: SRDateInsert,
          SRprenom: SRform_prenom,
          SRnom: SRform_nom,
          SRsociete: SRform_societe
        })

        // Changement de page vers Questionnaire
        SRcontext.$router.push({ name: 'questionnaire', params: { SRuserPrenom: SRform_prenom, SRuserNom: SRform_nom, SRuserSociete: SRform_societe } })
      }else{
        return false;
      }
    }
  }
}

</script>
