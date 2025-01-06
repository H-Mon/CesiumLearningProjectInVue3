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

        // const positions = new Float64Array([
        //     0.0, 0.0, 0.0,
        //     7500000.0, 0.0, 0.0,
        //     0.0, 7500000.0, 0.0
        // ]);

        // let geometry = new Cesium.Geometry({
        //     attributes : {
        //         position : new Cesium.GeometryAttribute({
        //             componentDatatype : Cesium.ComponentDatatype.DOUBLE,
        //             componentsPerAttribute : 3,
        //             values : positions
        //         })
        //     },
        //     indices : new Uint16Array([0, 1, 1, 2, 2, 0]),
        //     primitiveType : Cesium.PrimitiveType.LINES,
        //     boundingSphere : Cesium.BoundingSphere.fromVertices(positions)
        // });

        // let geometryInstance = new Cesium.GeometryInstance({
        //     geometry: geometry,
        //     id: "Test" 
        // });

        // viewer.scene.primitives.add(geometry);

        // viewer.scene.primitives.add({
        //     geometryInstances: [geometryInstance]
        //     // appearance : new Cesium.EllipsoidSurfaceAppearance({
        //     //     material : Cesium.Material.fromType('Checkerboard')
        //     // })
        // });

        const instance = new Cesium.GeometryInstance({
            geometry : new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray([
                    0.0, 0.0,
                    5.0, 0.0,
                    5.0, 5.0
                ]),
                width : 10.0
            }),
            id : 'object returned when this instance is picked and to get/set per-instance attributes'
        });
        viewer.scene.primitives.add(new Cesium.Primitive({
            geometryInstances : instance,
            appearance : new Cesium.EllipsoidSurfaceAppearance({
                material : Cesium.Material.fromType('Checkerboard')
            })
        }));

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