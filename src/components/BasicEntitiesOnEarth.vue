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

        const wyoming = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([
                    -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
                    -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
                    -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
                    -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
                ]),
                height: 0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK,
            },
        });

        // viewer.zoomTo(wyoming);

        const redLine = viewer.entities.add({
            name: "Red line on terrain",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
                width: 5,
                material: Cesium.Color.RED,
                clampToGround: true,
            },
        });

        const greenRhumbLine = viewer.entities.add({
            name: "Green rhumb line",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
                width: 5,
                arcType: Cesium.ArcType.RHUMB,
                material: Cesium.Color.GREEN,
            },
        });

        const glowingLine = viewer.entities.add({
            name: "Glowing blue line on the surface",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
                width: 10,
                material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2,
                taperPower: 0.5,
                color: Cesium.Color.CORNFLOWERBLUE,
                }),
            },
        });

        const orangeOutlined = viewer.entities.add({
            name:
                "Orange line with black outline at height and following the surface",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -75,
                39,
                250000,
                -125,
                39,
                250000,
                ]),
                width: 5,
                material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.ORANGE,
                outlineWidth: 2,
                outlineColor: Cesium.Color.BLACK,
                }),
            },
        });

        const purpleArrow = viewer.entities.add({
            name: "Purple straight arrow at height",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -75,
                43,
                500000,
                -125,
                43,
                500000,
                ]),
                width: 10,
                arcType: Cesium.ArcType.NONE,
                material: new Cesium.PolylineArrowMaterialProperty(
                Cesium.Color.PURPLE
                ),
            },
        });

        const dashedLine = viewer.entities.add({
            name: "Blue dashed line",
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -75,
                45,
                500000,
                -125,
                45,
                500000,
                ]),
                width: 4,
                material: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.CYAN,
                }),
            },
        });

        viewer.zoomTo(viewer.entities);
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