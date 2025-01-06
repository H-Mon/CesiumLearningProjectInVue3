<template>
    <div id="cesiumContainer" class="fullSize"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import Tokens from '../utils/Tokens.js';
import "cesium/Build/Cesium/Widgets/widgets.css";

onMounted(() => {
    window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium/';

    Cesium.Ion.defaultAccessToken = new Tokens().CesiumAccessToken; // This is made for get the token stored in Tokens.js file. You could change to your own token string.

    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain() // Show the terrain on the globe.
    });

    viewer.camera.setView({
        destination: new Cesium.Cartesian3(-3027372.253472838, 4980967.677694118, 2597958.8205332863),
        orientation: {
            heading: 6.260090257916604,
            pitch: -0.47228611320118574,
            roll: 6.282635403042613
        }
    });
})
</script>

<style lang="scss" scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>