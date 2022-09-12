<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import Tarjeta from "../components/Tarjeta.vue";

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

let favoritosItems = ref([]);
let showFavoritos = ref(false);
let favoritoExiste = ref(false);

if (window.localStorage.getItem("FAVORITOS") !== null) {
  favoritosItems.value = JSON.parse(window.localStorage.getItem("FAVORITOS"));
}

function addFavorito() {
  showFavoritos.value = true;

  if (
    !favoritosItems.value.find(
      (element) => element === climaActual.value.region
    )
  ) {
    favoritosItems.value.push(climaActual.value.region);
    window.localStorage.setItem(
      "FAVORITOS",
      JSON.stringify(favoritosItems.value)
    );
    console.log(JSON.parse(localStorage.getItem("FAVORITOS")));
    favoritoExiste.value = false;
  } else {
    favoritoExiste.value = true;
  }
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
    <!-- muestra el loandig o el contenido -->
    <LoadingSpinner v-if="loading" />
    <div v-else>
      <div v-if="showFavoritos">
        <div v-if="favoritoExiste">
          <div class="alert alert-danger" role="alert">
            Esta ubicación ya existe en favoritos.
          </div>
        </div>
        <div v-else>
          <div class="alert alert-success" role="alert">
            La ubicación se agrego a favoritos.
          </div>
        </div>
      </div>

      <!-- muestra la tarjeta del clima -->
      <div v-if="existeData">
        <tarjeta
          :busqueda="route.params.lugar"
          :region="climaActual.region"
          :horario="climaActual.horario"
          :temperatura="climaActual.temperatura"
          :precipitaciones="climaActual.precipitaciones"
          :humedad="climaActual.humedad"
          :viento="climaActual.viento"
          :comment="climaActual.comment"
          :iconURL="climaActual.iconURL"
        >
        </tarjeta>
      </div>
      <div v-else>
        <h3>No existen datos para su busqueda</h3>
      </div>

      <!-- botones de acciones -->
      <div class="actions">
        <button class="btn btn-secondary" @click="back">
          ← Volver a buscar
        </button>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="addFavorito()"
          :disabled="inicio === 0"
        >
          Agregar favorito
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

.actions {
  padding-top: 8px;
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

.image-url {
  padding-bottom: 10px;
}
</style>