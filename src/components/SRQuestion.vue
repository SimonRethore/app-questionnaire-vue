<template>
    <div class="container-fluid">
        <div class="row h-100">
            <div class="col-10 text-center m-auto">
                <p class="question">{{ SRquestion }}<p>
                <div class="text-left checkboxes d-flex justify-content-center">
                  <b-form-checkbox-group id="checkbox-group-1" v-model="SRselected" :options="SRoptions" name="flavour-1" stacked></b-form-checkbox-group>
                </div>
                <b-button @click="SRaddItem" type="submit" variant="light" class="button-form w-100 my-3">Question suivante</b-button>
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

  .question{
    font-family: 'Bree Serif', serif;
    font-size: 25px;
    margin-bottom: 20px;
    color: #253054;
  }

  .checkboxes{
    margin-bottom: 10px;
  }

  .button-form{
    background-color: #253054 !important;
    color: white !important;
  }
</style>

<script>

import SRfichierJSON from './../assets/questions.json' // Import du Fichier JSON des questions
import SRPouchDB from 'pouchdb' // Import PouchDB

export default {
  name: 'SRQuestion',

  data () {
    return {
      SRquestion: '', // Variable question courante
      SRselected: [], // Variable option selectionnée courante
      SRoptions: [
        { text: '', value: '' },
        { text: '', value: '' },
        { text: '', value: '' },
        { text: '', value: '' }
      ], // Variable option courante
      SRcorrectAnswer: '', // Variable bonne réponse courante
      SRanswerList: [], // Variable retour à la fin contenant toute les questions
      SRrandom: '', // Variable random permettant de choisir une question aléatoire du pool
      SRrandomList: [] // Variable contenant l'ensemble des randoms déja utilisé afin de ne pas reprendre 2 fois la même question
    }
  },

  methods: {
    // Méthode permettant de charger les donnée pour le Front
    SRfetchData () {
      this.SRselected = []

      // Génère un numéro random de question
      this.SRrandom = Math.floor(Math.random() * Math.floor(SRfichierJSON.questions.length))

      // Vérifie que la question n'a pas déjà été posée
      while (this.SRrandomList.indexOf(this.SRrandom) !== -1) {
        this.SRrandom = Math.floor(Math.random() * Math.floor(SRfichierJSON.questions.length))
      }

      // Ajoute au tableau pour ne pas retomber dessus
      this.SRrandomList.push(this.SRrandom)

      // Ajout des datas
      this.SRquestion = SRfichierJSON.questions[this.SRrandom].nom

      this.SRoptions[0].text = SRfichierJSON.questions[this.SRrandom].reponse_disponible[0]
      this.SRoptions[0].value = SRfichierJSON.questions[this.SRrandom].reponse_disponible[0]

      this.SRoptions[1].text = SRfichierJSON.questions[this.SRrandom].reponse_disponible[1]
      this.SRoptions[1].value = SRfichierJSON.questions[this.SRrandom].reponse_disponible[1]

      this.SRoptions[2].text = SRfichierJSON.questions[this.SRrandom].reponse_disponible[2]
      this.SRoptions[2].value = SRfichierJSON.questions[this.SRrandom].reponse_disponible[2]

      this.SRoptions[3].text = SRfichierJSON.questions[this.SRrandom].reponse_disponible[3]
      this.SRoptions[3].value = SRfichierJSON.questions[this.SRrandom].reponse_disponible[3]

      this.SRcorrectAnswer = SRfichierJSON.questions[this.SRrandom].reponse
    },

    // Méthode appelé à la validation du formulaire
    // Ajoute la question à la liste et vérifie si c'est la dernière
    SRaddItem () {
      var SRarrReponse = []

      for (var i = 0; i < this.SRselected.length; i++) {
        SRarrReponse[i] = this.SRselected[i]
      }

      var SRboolean = false

      // Vérifie si la réponse est multiple et donne le résultat en fonction du nombre de réponse
      if (SRarrReponse.length === 1) {
        if (SRarrReponse[0] === this.SRcorrectAnswer) {
          SRboolean = true
        }
      } else if (SRarrReponse.length > 1) {
        var SRretour = this.SRarr_diff(SRarrReponse, this.SRcorrectAnswer)
        if (SRretour.length === 0) {
          SRboolean = true
        }
      }

      // Construction d'un objet à ajouté à la liste
      var SRobjectQuestion = {}
      SRobjectQuestion = {
        'SRquestion': this.SRquestion,
        'SRoptions': this.SRoptions,
        'SRreponses': SRarrReponse,
        'SRreponse_valide': this.SRcorrectAnswer,
        'SRvalide': SRboolean
      }

      // Transforme l'objet en JSON
      var SRjsonQuestion = JSON.stringify(SRobjectQuestion)
      SRjsonQuestion = JSON.parse(SRjsonQuestion)

      // Push du JSON dans la liste
      this.SRanswerList.push(SRjsonQuestion)

      // Vérification sur le numéro de question (Max = 5)
      if (this.SRrandomList.length === 5) {
        // Insertion des données puis passage au résultat
        this.SRinsertData()
      } else {
        // Recharge la page avec une nouvelle question
        this.SRfetchData()
      }
    },

    // Méthode qui renvoie la différence entre deux tableaux
    SRarr_diff (SRarray1, SRarray2) {
      var SRarray = []
      var SRdiff = []
      for (var SRi = 0; SRi < SRarray1.length; SRi++) {
        SRarray[SRarray1[SRi]] = true
      }
      for (var SRj = 0; SRj < SRarray2.length; SRj++) {
        if (SRarray[SRarray2[SRj]]) {
          delete SRarray[SRarray2[SRj]]
        } else {
          SRarray[SRarray2[SRj]] = true
        }
      }
      for (var SRk in SRarray) {
        SRdiff.push(SRk)
      }
      return SRdiff
    },

    // Insert les données dans PouchDB
    SRinsertData () {
      // Génère la date actuel servant de réference
      const SRDateInsert = Date.now().toString()

      var SRcontext = this

      var SRdb = new SRPouchDB('app_questionnaire_vue')

      var SRpartieScore = 0

      // Calcul du score de la partie
      for (let SRi = 0; SRi < this.SRanswerList.length; SRi++) {
        if (this.SRanswerList[SRi].SRvalide === true) {
          SRpartieScore += 1
        }
      }

      // Insertion dans la BDD
      SRdb.put({
        _id: SRDateInsert,
        SRquestions: SRcontext.SRanswerList,
        SRnom: SRcontext.$route.params['SRuserNom'],
        SRprenom: SRcontext.$route.params['SRuserPrenom'],
        SRsociete: SRcontext.$route.params['SRuserSociete'],
        SRscore: SRpartieScore
      })

      // Changement de page vers Résultats
      SRcontext.$router.push({ name: 'resultats', params: { SRidQuestionnaire: SRDateInsert } })
    }
  },

  // Méthode qui se lance au premier chargement de la page
  created () {
    // Méthode permettant de charger les donnée pour le Front
    this.SRfetchData()
  }
}
</script>
