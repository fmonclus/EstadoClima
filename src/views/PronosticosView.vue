<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Tarjeta from "../components/Tarjeta.vue";
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
    comment: "",
    iconURL: "",
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
      climaActual.value.iconURL = data.currentConditions.iconURL;
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
        <tarjeta
          :busqueda="route.params.lugar"
          :region="climaActual.region"
          :horario="climaActual.horario"
          :temperatura="climaActual.temperatura"
          :precipitaciones="climaActual.precipitaciones"
          :viento="climaActual.viento"
          :comment="climaActual.comment"
          :iconURL="climaActual.iconURL"
        >
        </tarjeta>
      </div>
      <div v-else>
        <h3>No existen datos para su busqueda</h3>
      </div>
      <div class="actions">
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

.actions {
  padding-top: 8px;
}
</style>