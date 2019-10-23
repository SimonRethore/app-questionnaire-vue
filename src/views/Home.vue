<template>
  <div>
    <div class="container align-middle">
      <div class="row">
        <div class="col-10 mx-auto">
          <b-form-input class="text-center my-3" v-model="text" placeholder="Prénom"></b-form-input>
          <b-form-input class="text-center my-3" v-model="text" placeholder="Nom"></b-form-input>
          <b-form-input class="text-center my-3" v-model="text" placeholder="Société"></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home'
  // components: {
  // }
}
</script>
