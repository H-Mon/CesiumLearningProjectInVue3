<script setup>
import Earth from './components/Earth.vue';
import AirLineOnEarth from './components/AirLineOnEarth.vue';
import BasicEntitiesOnEarth from './components/BasicEntitiesOnEarth.vue';
import BasicPrimitivesOnEarth from './components/BasicPrimitivesOnEarth.vue';
import ContourLinesInSpecificArea from './components/ContourLinesInSpecificArea.vue';
</script>

<template>
  <!-- <Earth></Earth> -->
  <!-- <AirLineOnEarth></AirLineOnEarth> -->
  <!-- <BasicEntitiesOnEarth></BasicEntitiesOnEarth> -->
  <!-- <BasicPrimitivesOnEarth></BasicPrimitivesOnEarth> -->
  <ContourLinesInSpecificArea></ContourLinesInSpecificArea>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
