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

    viewer.scene.globe.depthTestAgainstTerrain = true;

    viewer.camera.setView({
        destination: new Cesium.Cartesian3(-3027372.253472838, 4980967.677694118, 2597958.8205332863),
        orientation: {
            heading: 6.260090257916604,
            pitch: -0.47228611320118574,
            roll: 6.282635403042613
        }
    });

    // Specify four points
    // [121.23311826816142, 24.315874568629347, 2187.3978569631345]
    // [121.35027762461736, 24.327780752814242, 2092.538296280312]
    // [121.32036563749641, 24.221675317821823, 2441.924508223284]
    // [121.25981872880587, 24.222915733075816, 1955.3521801073277]
    const polygonGeometry = Cesium.PolygonGeometry.fromPositions({positions: Cesium.Cartesian3.fromDegreesArray([
      121.23311826816142, 24.315874568629347,
      121.35027762461736, 24.327780752814242,
      121.32036563749641, 24.221675317821823,
      121.25981872880587, 24.222915733075816
    ])});

    const geometry = Cesium.PolygonGeometry.createGeometry(polygonGeometry);
    const trianglePositions = Cesium.Cartesian3.unpackArray(geometry.attributes.position.values);
    const triangleCartos = viewer.scene.globe.ellipsoid.cartesianArrayToCartographicArray(trianglePositions);
    // const indices = geometry.indices;

    Cesium.sampleTerrainMostDetailed(viewer.scene.terrainProvider, triangleCartos).then(
        function (cartographics) {
            // Method to get properties
            // let firstLongitude = cartographics[0].longitude;
            // let firstLatitude = cartographics[0].latitude;
            // let firstHeight = cartographics[0].height;
        }
    );
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