<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";


const route = useRoute();
const router = useRouter();

const value = ref("");

function buscar() {
  const lugar = txtLugar.value;
  router.push("Pronosticos/" + lugar);
}
</script>

<template>
  <div class="margen">
<h3>Estado del clima</h3>
  <h4>Conozca el estado actual del clima en cualquier parte del mundo</h4>

  <br />

  <input
    id="txtLugar"
    placeholder="Localidad, Provincia, País"
    class="form-control"
    v-model="value"
  />

  <br />

  <button type="submit" class="btn btn-block btn-dark" @click="buscar">
    Buscar
  </button>
  </div>
  
</template>

<style scoped>
h3 {
  color: #e8af2e;
}

h4 {
  color: #f7e4b8;
}

input {
  max-width: 350px;
}

button {
  background-color: #e8af2e;
  max-width: 350px;
}
.margen {
    padding-left: 15px;
}
</style>