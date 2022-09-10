<script setup>
</script>

<template>
  <div class="margen">
    <h3><strong>Bienvenidos a Estado del clima</strong></h3>
    <h4>
      <p class="descripcion">
        Esta es una aplicacion para poner en practicas conceptos de Vue.JS
      </p>
      <p class="descripcion">Utilizando la API de weatherDB</p>
      <p class="descripcion">
        <strong>Documentacion API Clima: </strong
        ><a
          href="https://weatherdbi.herokuapp.com/documentation/v1"
          target="_blank"
          >weatherdbi.herokuapp.com</a
        >
      </p>
      <p class="descripcion">
        <strong>Wallpaper: </strong
        ><a href="https://www.wallpaperup.com/" target="_blank"
          >www.wallpaperup.com</a
        >
      </p>
    </h4>
  </div>
</template>

<style scoped>
h3 {
  color: #e8af2e;
  padding-bottom: 10px;
}

a {
  color: #e8af2e;
}

a:hover {
  text-decoration: underline;
}

.descripcion {
  color: #f7e4b8;
}

.margen {
  padding-left: 15px;
}
</style>
