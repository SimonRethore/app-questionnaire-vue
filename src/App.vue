<template>
  <div id="app">

    <b-navbar  toggleable="sm" class="main-navbar" >
      <b-navbar-toggle class="button-navbar" target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand class="libelle-navbar">EEV SAS</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text class="text-navbar mx-4" href="/test">Faire le test</b-nav-text>
          <b-nav-text class="text-navbar mx-4">Administration</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
  .main-navbar{
    background-color: #0d1a42;
    z-index: 2;
  }

  .button-navbar{
    background-repeat: no-repeat;
    background-position-x: 5px;
    width: 50px;
    border-color: white !important;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }

  .navbar-toggler-icon{
    background-image: none !important;
  }

  .libelle-navbar{
    color: white !important;
  }

  .text-navbar{
    color: white !important;
  }
</style>
