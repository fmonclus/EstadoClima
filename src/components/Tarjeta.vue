<script setup>
import { ref, computed } from "vue";

defineProps({
  busqueda: String,
  region: String,
  horario: String,
  temperatura: Number,
  precipitaciones: String,
  humedad: String,
  viento: Number,
  comment: String,
  iconURL: String,
});

const format = (date, locale) => new Intl.DateTimeFormat(locale).format(date);
const date = ref(format(new Date(), "pt-BR"));
</script>

<template>
  <h3>Estado del tiempo para "{{ busqueda }}"</h3>
  <img class="image-url" :src="iconURL" alt="icono clima" />

  <p class="descripcion">
    <strong>Región: </strong><span class="detalle">{{ region }}</span>
  </p>
  <p class="descripcion">
    <strong>Fecha Local: </strong><span class="detalle">{{ date }}</span>
  </p>
  <p class="descripcion">
    <strong>Último pronóstico : </strong
    ><span class="detalle">{{ horario }}</span>
  </p>
  <p class="descripcion">
    <strong>Temperatura: </strong
    ><span class="detalle">{{ temperatura }}°C</span>
  </p>
  <p class="descripcion">
    <strong>Probalidad lluvias: </strong
    ><span class="detalle">{{ precipitaciones }}</span>
  </p>
  <p class="descripcion">
    <strong>Humedad: </strong><span class="detalle">{{ humedad }}</span>
  </p>
  <p class="descripcion">
    <strong>Viento: </strong><span class="detalle">{{ viento }} km/h</span>
  </p>
  <p class="descripcion">
    <strong>Comentarios: </strong><span class="detalle">{{ comment }}</span>
  </p>
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

.image-url {
  padding-bottom: 10px;
}
</style>