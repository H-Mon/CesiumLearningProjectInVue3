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

        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings()); // Draw the buildings on the earth using Cesium's data

        // Fly the camera to the given longitude, latitude, and height.
        viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(116.383331, 39.916668, 800),
        orientation : {
            heading : Cesium.Math.toRadians(0.0),
            pitch : Cesium.Math.toRadians(-15.0),
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