<template>
    <div class="full-map p-2">

        <h2>Visited States!</h2>
        <h3>Here's a map of all the states you've visited</h3>

        <div id="map-container">
            <!-- creating the map base itself, it's level of zoom and center,
            still needs tiles placed in it. -->
            <l-map
                ref="map"
                style="height: 100%; width: 100%"
                v-bind:zoom="zoom"
                v-bind:center="center">

            <!-- https://github.com/vue-leaflet/Vue2Leaflet/issues/275 -->
                <!-- checked the site above to find out about syntax for
                adding multiple markers. A v-for loop runs through all the visited
                states, and plugs in the latitude and longitude from each, as 
                well as setting the icon -->
                <l-marker
                    v-for="state in visitedStates"
                    v-bind:key="state.name"
                    v-bind:lat-lng="[state.lat, state.lon]"
                    v-bind:icon="icon">
                    <!-- added a small popup so I could click on the markers,
                    helpful for smaller states I think. -->
                <l-popup>{{ state.name }}</l-popup>
                </l-marker>
                <!-- the real map pieces, using the url to get tiles from online -->
                <l-tile-layer :url="url"></l-tile-layer>
            </l-map>
        </div>

    </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

export default {
    name: 'FullMap',
    components: {
        LMap, LTileLayer, LMarker, LPopup
    },
    data() {
        return {
            states: [],
            visitedStates: [],
            // external site for tiles, handled by vue2 leaflet I assume,
            // routing through and bring back the requested tiles for the map.
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 4,
            center: [38, -96],
            // sets the icon needed for markers
            icon: L.icon({
                // necessary to use require() so it doesn't try to route through the API
                iconUrl: require('../assets/icons8-push-pin-64.png'),
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        }
    },
    // method calls that occur when the component is loaded. starting to understand that more.
    mounted() {
        this.getAll()
    },
    methods: {
        // getAll() will go through the stateService.js file and use the Axios API calls
        // to bring back all the state data and plug it into the array in data()
        // then it calls the more local findVisited method..
        getAll() {
            this.$stateService.getAll().then(data => {
                this.states = data
                this.findVisited(this.states)
            })
        },
        // this method will take the populated states data and loop through it
        // checking the visited status, pushing those elements into the second array
        // which is used to populate the l-markers in the map.
        findVisited(allStates) {
            allStates.forEach(element => {
                if (element.visited) {
                    this.visitedStates.push(element)
                }
            })
        }
    }
}
</script>

<style scoped>
    #map-container {
        height: 30em;
    }
</style>