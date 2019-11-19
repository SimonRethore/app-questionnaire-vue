<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-10 text-center m-auto">
          <table class="tableau">
            <thead class="headertableau">
              <tr>
                <th class="elementhtableau">Nom</th>
                <th class="elementhtableau">Société</th>
                <th class="elementhtableau">Score</th>
              </tr>
            </thead>
            <tbody class="footertableau">
              <tr v-for="SRclassement in SRclassements" v-bind:key="SRclassement">
                <td class="elementdtableau">{{ SRclassement.SRprenom }} {{ SRclassement.SRnom }}</td>
                <td class="elementdtableau">{{ SRclassement.SRsociete }}</td>
                <td class="elementdtableau">{{ SRclassement.SRscore }}</td>
              </tr>
            </tbody>
          </table>
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

  .tableau{
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;
    border: 5px solid black;
  }

  .headertableau{
    background-color: #eb8242;
    border: 2px solid black;
  }

  .footertableau{
    background-color:white;
    border: 2px solid black;
  }

  .elementhtableau{
    height: 70px;
    border: 2px solid black;
  }

  .elementdtableau{
    height: 50px;
    border: 2px solid black;
  }
</style>

<script>
import SRPouchDB from 'pouchdb'

export default {
  name: 'SRClassement',
  data () {
    return {
      SRclassements: [] // Variable contenant les résultats de touts les utilisateurs
    }
  },
  methods: {
    // Méthode permettant de charger les donnée pour le Front
    async SRfetchData () {
      var SRcontext = this
      var SRdb = new SRPouchDB('app_questionnaire_vue')

      // Récupération de tous les enregistrements de la BDD
      SRdb.allDocs({}).then(function (SRres) {
        for (let SRi = 0; SRi < SRres.rows.length; SRi++) {
          SRdb.get(SRres.rows[SRi].id.toString()).then(function (SRdoc) {
            // Vérification sur la propriété SRquestions (tri)
            if (SRdoc.hasOwnProperty('SRquestions')) {
              // Ajout des datas
              SRcontext.SRclassements.push(SRdoc)
            }
          })
        }
      })
    }
  },
  // Méthode qui se lance au premier chargement de la page (async pour permettre d'attendre la fin du fetch data)
  async created () {
    // Méthode permettant de charger les donnée pour le Front
    await this.SRfetchData()
  }
}

</script>
