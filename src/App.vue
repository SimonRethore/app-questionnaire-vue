<template>
  <div id="app">

    <b-navbar  toggleable="sm" class="main-navbar" >
      <b-navbar-toggle class="button-navbar" target="nav-text-collapse"></b-navbar-toggle>

      <router-link to="/"><b-navbar-brand class="libelle-navbar">EEV SAS</b-navbar-brand></router-link>

      <b-collapse class="collapse-navbar" id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/inscription"><b-nav-text class="text-navbar active">Faire le questionnaire</b-nav-text></router-link>
          <router-link to="/admin"><b-nav-text class="text-navbar">Administration</b-nav-text></router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style scoped>
  .main-navbar{
    background-color: #0d1a42;
    z-index: 2;
    padding-top: 0;
    padding-bottom: 0;
  }

  .button-navbar{
    background-repeat: no-repeat;
    background-position-x: 5px;
    width: 50px;
    border-color: white !important;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }

  .button-navbar:active{
    outline: none;
  }

  .navbar-toggler-icon{
    background-image: none !important;
  }

  .libelle-navbar{
    font-family: 'Bree Serif', serif;
    color: white !important;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
  }

  .router-link-exact-active {
    background-color: #253054;
    color: white;
    text-decoration: none;
  }

  .router-link-exact-active:active {
    color: white;
  }

  .navbar-nav{
    height: 100%;
  }

  .text-navbar{
    color: white !important;
  }

    /* .active{
    } */

  @media screen and (max-width: 575px){
    .collapse-navbar{
      margin-top: 20px;
    }

    .text-navbar{
      padding-top: 10px !important;
      /* padding-bottom: 0px; */
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  @media screen and (min-width: 576px){
    .collapse-navbar{
      position: absolute;
      top: 0;
      height: 100%;
      right: 0;
    }

    .text-navbar{
      padding-top: 15px !important;
      padding-bottom: 0px;
      padding-left: 25px;
      padding-right: 25px;
    }
  }

</style>
