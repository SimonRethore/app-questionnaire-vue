<template>
  <div id="app">

    <b-navbar  toggleable="sm" class="main-navbar" type="dark" variant="dark" >
      <b-navbar-toggle class="button-navbar" target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand class="libelle-navbar">EEV SAS</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text class="text-navbar mx-4">Faire le test</b-nav-text>
          <b-nav-text class="text-navbar mx-4">Administration</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
  .main-navbar{
    background-color: #494ca2;
  }

  .button-navbar{
    /* color: white !important; */
    border-color: white !important;
  }

  .libelle-navbar{
    color: white !important;
  }

  .text-navbar{
    color: white !important;
  }

  .navbar-collapse{
    right: 0;
    position: absolute;
  }
</style>
