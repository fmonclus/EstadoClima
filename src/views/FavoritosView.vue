<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
let active = false;

let favoritosItems = ref([]);
if (window.localStorage.getItem("PronosticosFav") !== null) {
  favoritosItems.value = JSON.parse(window.localStorage.getItem("PronosticosFav"));
  favoritosItems.value = favoritosItems.value.sort();
  active = true;
}

function removeAccents(strAccents){
    strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = ['A','A','A','A','A','A','a','a','a','a','a','a','O','O','O','O','O','O','O','o','o','o','o','o','o','E','E','E','E','e','e','e','e','e','C','c','D','I','I','I','I','i','i','i','i','U','U','U','U','u','u','u','u','N','n','S','s','Y','y','y','Z','z'];
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut[accents.indexOf(strAccents[y])];
        }
        else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}
</script>

<template>
  <div class="margen">
    <h3>Favoritos</h3>

    <div v-if="active">
      <h4>Lista de sus pronosticos favoritos.</h4>
      <ul>
        <li class="favorito" v-for="favorito in favoritosItems" :key="favorito">
          <a v-bind:href="`/Pronosticos/${removeAccents(favorito)}`">{{ favorito }}</a>          
        </li>
      </ul>
    </div>
    <div v-else>
      <h4>No hay favoritos.</h4>
    </div>
  </div>
</template>  

<style scoped>
h3 {
  color: #e8af2e;
}

h4 {
  color: white;
}

.margen {
  padding-left: 15px;
}

a {
  color: #f7e4b8;
}

.favorito {
  color: #f7e4b8;
  font-size: 1.8rem;
}
</style>
