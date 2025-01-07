<template>
    <div id="cesiumContainer" class="fullSize"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import Tokens from '../utils/Tokens.js';
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as turf from "@turf/turf";

onMounted(() => {
    window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium/';

    Cesium.Ion.defaultAccessToken = new Tokens().CesiumAccessToken; // This is made for get the token stored in Tokens.js file. You could change to your own token string.

    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain() // Show the terrain on the globe.
    });

    viewer.scene.globe.depthTestAgainstTerrain = true;

    // A place where mountains are there
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(-3027372.253472838, 4980967.677694118, 2597958.8205332863),
        orientation: {
            heading: 6.260090257916604,
            pitch: -0.47228611320118574,
            roll: 6.282635403042613
        }
    });

    // Specify four points to form a specific area
    // [121.23311826816142, 24.315874568629347, 2187.3978569631345]
    // [121.35027762461736, 24.327780752814242, 2092.538296280312]
    // [121.32036563749641, 24.221675317821823, 2441.924508223284]
    // [121.25981872880587, 24.222915733075816, 1955.3521801073277]

    // Calculate the bounding box of the polygon
    let geoPolygon = turf.polygon([[
        [121.23311826816142, 24.315874568629347],
        [121.35027762461736, 24.327780752814242],
        [121.32036563749641, 24.221675317821823],
        [121.25981872880587, 24.222915733075816],
        [121.23311826816142, 24.315874568629347] // The last point must be the same point with the first point
    ]]);

    let bbox = turf.bbox(geoPolygon);

    let grid = turf.pointGrid(bbox, 50, { units: "meters" }); // TODO: Adjust the granularity according to the sizes of the area automatically.

    // Convert the grid from GeoJSON to cartographic positions
    let gridCartoArray = [];
    for (let i = 0; i < grid.features.length; i++) {
        gridCartoArray.push(Cesium.Cartographic.fromDegrees(grid.features[i].geometry.coordinates[0], grid.features[i].geometry.coordinates[1], 0));
    }

    Cesium.sampleTerrainMostDetailed(viewer.scene.terrainProvider, gridCartoArray).then(function (cartographics) {
        let geoJSONInput = {
            type: "FeatureCollection",
            features: []
        };

        let minHeight = 9999; // The min height must be lower than 9999, therefore this number will be changed anyway.
        let maxHeight = -9999; // The max height must be higher than -9999, therefore this number will be changed anyway.
        for (let i = 0; i < cartographics.length; i++) {
            geoJSONInput.features.push(
                {
                    type: "Feature",
                    properties: {
                        height: cartographics[i].height
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [
                            Cesium.Math.toDegrees(cartographics[i].longitude),
                            Cesium.Math.toDegrees(cartographics[i].latitude)
                        ]
                    }
                }
            );
            if (minHeight > cartographics[i].height) {
                minHeight = cartographics[i].height;
            }
            if (maxHeight < cartographics[i].height) {
                maxHeight = cartographics[i].height;
            }
        }

        let heightDelta = maxHeight - minHeight;
        let step = Math.max(heightDelta / 10, 0.5);
        let midHeight = minHeight + heightDelta / 2;
        let breaks = [-9999, midHeight, 9999]; // Starting from the middle of the height, then we expend the seperator to higher or lower places gradually.
        for (let i = 1; minHeight <= (midHeight - (step * i)); i++) {
            breaks.push(midHeight - (step * i)); // boundaries bellow the middle
            breaks.push(midHeight + (step * i)); // boundaries above the middle
        }
        breaks.sort((a, b) => a - b); // Ascending

        let lines = turf.isolines(geoJSONInput, breaks, { zProperty: "height" });

        // draw the contour lines on the ground
        let contourLinesContainer = new Cesium.PrimitiveCollection();

        // resolve the GeoJSON object mannually and convert it to the grounded polyline in Cesium
        for (let i = 0; i < lines.features.length; i++) {
            let featureCollection = new Cesium.PrimitiveCollection();
            for (let j = 0; j < lines.features[i].geometry.coordinates.length; j++) {
                // lines.features[i].geometry.coordinates[j]
                let cartesianPositionsOfOnePolyline = [];
                for (let k = 0; k < lines.features[i].geometry.coordinates[j].length; k++) {
                    cartesianPositionsOfOnePolyline.push(Cesium.Cartesian3.fromDegrees(lines.features[i].geometry.coordinates[j][k][0], lines.features[i].geometry.coordinates[j][k][1]));
                }
                featureCollection.add(new Cesium.GroundPolylinePrimitive({
                    geometryInstances: new Cesium.GeometryInstance({
                        geometry: new Cesium.GroundPolylineGeometry({
                            positions: cartesianPositionsOfOnePolyline,
                            width: 2.0
                        }),
                    }),
                    appearance: new Cesium.PolylineMaterialAppearance({
                        material: Cesium.Material.fromType('Color', { color: Cesium.Color.RED })
                    })
                }));
            }

            contourLinesContainer.add(featureCollection);
        }

        viewer.scene.primitives.add(contourLinesContainer);
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