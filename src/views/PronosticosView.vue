<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const route = useRoute();
const router = useRouter();
const climaApi = ref({});

const loading = ref(false);
const existeData = ref(true);
const datoBuscado = ref("");

const climaActual = ref([
  {
    region: "",
    horario: "",
    temperatura: "",
    precipitaciones: "",
    humedad: "",
    viento: "",
    comment: ""
  },
]);

function back() {
  router.push("/EstadoClima");
}

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await axios.get(
      `https://weatherdbi.herokuapp.com/data/weather/${route.params.lugar}`
    );

    climaApi.value = data;
    console.log(climaApi);

    if (data.status === "fail") {
      existeData.value = false;
    } else {
      existeData.value = true;
      climaActual.value.region = data.region;
      climaActual.value.horario = data.currentConditions.dayhour;
      climaActual.value.temperatura = data.currentConditions.temp.c;
      climaActual.value.precipitaciones = data.currentConditions.precip;
      climaActual.value.humedad = data.currentConditions.humidity;
      climaActual.value.viento = data.currentConditions.wind.km;
      climaActual.value.comment = data.currentConditions.comment;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="margen">
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <div v-if="existeData">
        <h3>Estado del tiempo para {{ climaActual.region }}</h3>
        <p class="descripcion">
          <strong>Region: </strong><span class="detalle">{{ climaActual.region }}</span>
        </p>
        <p class="descripcion">
          <strong>Horario: </strong><span class="detalle">{{ climaActual.horario }}</span>
        </p>
        <p class="descripcion">
          <strong>Temperatura: </strong
          ><span class="detalle">{{ climaActual.temperatura }}°C</span>
        </p>
        <p class="descripcion">
          <strong>Probalidad lluvias: </strong
          ><span class="detalle">{{ climaActual.precipitaciones }}</span>
        </p>
        <p class="descripcion">
          <strong>Humedad: </strong><span class="detalle">{{ climaActual.humedad }}</span>
        </p>
        <p class="descripcion">
          <strong>Viento: </strong
          ><span class="detalle">{{ climaActual.viento }} km/h</span>
        </p>
        <p class="descripcion">
          <strong>Comentarios: </strong
          ><span class="detalle">{{ climaActual.comment }}</span>
        </p>
      </div>
      <div v-else>
        <h3>No existen detos para su busqueda</h3>
      </div>
      <div style="padding-top: 20px">
        <button class="btn btn-secondary" @click="back">
          ← Volver a buscar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  color: #e8af2e;
  padding-bottom: 10px;
}

.margen {
  padding-left: 15px;
}

.descripcion {
  color: #f7e4b8;
  font-size: large;
}

.detalle {
  color: white;
}
</style>