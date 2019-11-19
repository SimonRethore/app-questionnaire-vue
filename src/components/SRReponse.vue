<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-10 text-center m-auto">
            <div v-for="SRresult in SRresults" v-bind:key="SRresult">
              <div class="result">
                <p>{{ SRresult.SRquestion }}<p>
                <div class="text-left checkboxes d-flex justify-content-center mb-4">
                  <b-form-checkbox-group id="checkbox-group-1" v-model="SRresult.SRreponses" :options="SRresult.SRoptions" name="flavour-1" stacked disabled></b-form-checkbox-group>
                </div>
                <div v-if="SRresult.SRvalide == true">
                  <b-alert show variant="success">{{ SRresult.SRreponse_valide }}</b-alert>
                </div>
                <div v-else>
                  <b-alert show variant="danger">{{ SRresult.SRreponse_valide }}</b-alert>
                </div>
              </div>
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

  .row{
    position: absolute;
    margin-top: 56px;
    height: 90%;
    width: 100%;
    overflow-y: scroll;
  }

  .result{
    margin-bottom: 50px;
    margin-top: 40px;
  }
</style>

<script>
import SRPouchDB from 'pouchdb'

export default {
  name: 'SRReponse',
  data () {
    return {
      SRresults: [] // Variable contenant les résultats
    }
  },

  methods: {
    // Méthode permettant de charger les donnée pour le Front
    SRfetchData () {
      var SRcontext = this
      var SRdb = new SRPouchDB('app_questionnaire_vue')

      // Récuppération des données de l'inscription grâce au route
      SRdb.get(this.$route.params['SRidQuestionnaire']).then(function (SRdoc) {
        SRcontext.SRresults = SRdoc.SRquestions

        for (let SRi = 0; SRi < SRcontext.SRresults.length; SRi++) {
          // Vérif si la réponse valide est un array afin de concaténer pour le front
          if (Array.isArray(SRcontext.SRresults[SRi].SRreponse_valide) === true) {
            var SRconcat = ''

            SRcontext.SRresults[SRi].SRreponse_valide.forEach(SRelement => {
              SRconcat += SRelement + ' / '
            })

            SRconcat = SRconcat.substr(0, SRconcat.length - 2)

            // Ajout des datas
            SRcontext.SRresults[SRi].SRreponse_valide = SRconcat
          }
        }
      })
    }
  },
  // Méthode qui se lance au premier chargement de la page
  created () {
    // Méthode permettant de charger les donnée pour le Front
    this.SRfetchData()
  }
}
</script>
