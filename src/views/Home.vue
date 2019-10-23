<template>
  <div>
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col-10 m-auto">
          <b-form-input class="text-center my-3" placeholder="Prénom"></b-form-input>
          <b-form-input class="text-center my-3" placeholder="Nom"></b-form-input>
          <b-form-input class="text-center my-3" placeholder="Société"></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .container-fluid{
    position: fixed;
    height: 100%;
    bottom: 0;
    width: 100%;
  }
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home'
  // components: {
  // }
}
</script>
