<template>
    <div class="state-detail p-2">

        <h2>The State of {{state.name}}</h2>

        <p v-if="state.visited">You have visited this state</p>
        <p v-else>You have not visited this state</p>

        <div id="map-container">
            <!-- Fixed state detail! -->
            <l-map
                ref="map"
                style="height: 100%; width: 100%"
                v-bind:center="startCenter"
                v-bind:zoom="zoom">
                <l-marker 
                    v-bind:lat-lng="markerLatLong"
                    v-bind:icon="icon"
                    ></l-marker>
                <l-tile-layer :url="url"></l-tile-layer>
            </l-map>
        </div>

    </div>
</template>

<script>
// L to set the icon, LMap to set the base, LTileLayer to fill that base, LMarker to add markers
import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
    name: 'StateDetail',
    components: {
        LMap, LTileLayer, LMarker
    },
    data() {
        return {
            state: {
                name: ''
            },
            startCenter: [40, -90],
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 0,
            markerLatLong: [0, 0],
            icon: L.icon({
                iconUrl: require('../assets/icons8-push-pin-64.png'),
                iconSize: [50, 50],
                iconAnchor: [30, 30]
            })
        }
    },
    mounted() {
        // a state's name is sent when this route is used
        this.state.name = this.$route.params.state
        // so the method gets that state's data to use for the lat and long data
        this.fetchStateData()
    },
    methods: {
        fetchStateData() {
            // the API is used to get that state's data, which is then fed in
            this.$stateService.getOne( this.state.name ).then( data => {
                // the state, zoom, center, and marker location are created with it
                this.state = data
                this.zoom = data.zoom
                this.center = [data.lat, data.lon]
                this.markerLatLong = this.center
                // flies to center of the states coords
                // next tick is needed because the map isn't always populated at this point
                // thanks for the info on this!
                this.$nextTick( () => {
                    // once that's done, the map can be moved to the appropriate coordinates and zoom level
                    this.$refs.map.mapObject.flyTo(this.center, this.zoom)
                })
            }).catch( err => console.error(err))
        }
    }
}
</script>

<style scoped>
    #map-container {
        height: 30em;
    }
</style>