<template>
    <div class="container-fluid">
        <div class="row h-100">
            <div class="col-10 text-center m-auto">
                <p class="question">{{ question }}<p>
                <div class="text-left checkboxes d-flex justify-content-center">
                <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="options" name="flavour-1" stacked></b-form-checkbox-group>
                </div>
                <b-button @click="addItem" type="submit" variant="light" class="button-form w-100 my-3">Question suivante</b-button>
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

import fichierJSON from './../assets/questions.json'
import PouchDB from 'pouchdb'

export default {
  name: 'Question',

  data () {
    return {
      question: '',
      selected: [],
      options: [
        { text: '', value: '' },
        { text: '', value: '' },
        { text: '', value: '' },
        { text: '', value: '' }
      ],
      answerList: [],
      correctAnswer: '',
      random: '',
      randomList: []
    }
  },

  methods: {
    fetchData () {
      // console.log(fichierJSON)
      console.log(this.answerList)

      this.selected = []

      this.random = Math.floor(Math.random() * Math.floor(fichierJSON.questions.length))

      while (this.randomList.indexOf(this.random) !== -1) {
        this.random = Math.floor(Math.random() * Math.floor(fichierJSON.questions.length))
      }

      this.randomList.push(this.random)

      this.question = fichierJSON.questions[this.random].nom

      this.options[0].text = fichierJSON.questions[this.random].reponse_disponible[0]
      this.options[0].value = fichierJSON.questions[this.random].reponse_disponible[0]

      this.options[1].text = fichierJSON.questions[this.random].reponse_disponible[1]
      this.options[1].value = fichierJSON.questions[this.random].reponse_disponible[1]

      this.options[2].text = fichierJSON.questions[this.random].reponse_disponible[2]
      this.options[2].value = fichierJSON.questions[this.random].reponse_disponible[2]

      this.options[3].text = fichierJSON.questions[this.random].reponse_disponible[3]
      this.options[3].value = fichierJSON.questions[this.random].reponse_disponible[3]

      this.correctAnswer = fichierJSON.questions[this.random].reponse
    },

    addItem () {
      var arrReponse = []

      for (var i = 0; i < this.selected.length; i++) {
        arrReponse[i] = this.selected[i]
      }

      var boolean = false

      if (arrReponse.length === 1) {
        if (arrReponse[0] === this.correctAnswer) {
          boolean = true
        }
      } else if (arrReponse.length > 1) {
        var retour = this.arr_diff(arrReponse, this.correctAnswer)
        if (retour.length === 0) {
          boolean = true
        }
      }

      this.answerList.push({
        'question': this.question,
        'reponses': arrReponse,
        'reponse_valide': this.correctAnswer,
        'valide': boolean
      })

      if (this.randomList.length === 5) {
        this.insertData()
      } else {
        this.fetchData()
      }
    },

    arr_diff (a1, a2) {
      var a = []; var diff = []
      for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true
      }
      for (var j = 0; j < a2.length; j++) {
        if (a[a2[j]]) {
          delete a[a2[j]]
        } else {
          a[a2[j]] = true
        }
      }
      for (var k in a) {
        diff.push(k)
      }
      return diff
    },

    insertData () {
      const DateInsert = Date.now().toString()

      var context = this

      var db = new PouchDB('app_questionnaire_vue')

      db.put({
        _id: DateInsert,
        questions: context.answerList,
        nom: context.$route.params['userNom'],
        prenom: context.$route.params['userPrenom'],
        societe: context.$route.params['userSociete']
      })

      context.$router.push({ name: 'resultats', params: { idQuestionnaire: DateInsert } })
    }
  },

  created () {
    this.fetchData()
  }
}
</script>
