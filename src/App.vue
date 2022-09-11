<script setup>
import { ref } from "vue";
import { useRoute, RouterView, useRouter } from "vue-router";
import HelloWorld from "./components/Inicio.vue";

// const router = useRouter();
// router.push("Home");
</script>

<template>  
  <nav class="navbar navbar-default navbar-inverse" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">Estado Clima</a>
      </div>
      
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
        <li>
           <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/EstadoClima">Pronósticos</router-link>        
          </li>          
        </ul>
      </div>
    </div>
  </nav>



  <RouterView />
</template>

<style scoped>

</style>
