<template>
    <div id="state-list">

        <!-- the summary component which uses the computed data sections for displaying. -->
        <Summary
            v-bind:total="totalVisited"
            v-bind:visitedAll="visitedAll">
        </Summary>

        <div class="d-flex flex-wrap justify-content-around">
            <!-- each state gets its own component for displaying, the flex wrap and justify content
            keeps them in their own lil box and filling the page I think -->
            <div class="p-2" v-for="state in states" v-bind:key="state.name">
                <!-- each state also has it's own trigger for if it's visited. this is 
                the emit receive location from the State.vue component. -->
                <State
                    v-bind:state="state"
                    v-on:isVisited="updateVisited"
                ></State>
            </div>
        </div>

    </div>
</template>

<script>

import State from '@/components/State'
import Summary from '@/components/Summary'

export default {
    name: 'StateList',
    components: {
        State, Summary
    },
    data() {
        return {
            states: [],
        }
    },
    mounted() {
        this.getAll()
    },
    methods: {
        // the method called at the start, gets all the states from the API service
        // which gives the v-for data to loop through and create State components.
        getAll() {
            this.$stateService.getAll().then(data => {
                this.states = data
            })
        },
        // when activated, takes the emitted data and sends them to the axios routes
        // and then into the API's routes, and at the end, refreshes the getAll to update
        // the state list.
        updateVisited(stateName, stateVisited) {
            this.$stateService.setVisited(stateName, stateVisited).then( () => {
                this.getAll()
            })
        }
    },
    computed: {
        totalVisited() {
            // creates an array of states that have true in the visited field
            let visited = this.states.filter(function(state) {
                return state.visited
            })
            return visited.length
        },
        visitedAll() {
            // if that count is equal to the total length of states, then you get the complete message
            // adaptable to more states being added, not just 51.
            let visited = this.states.filter(function(state) {
                return state.visited
            })
            return visited.length == this.states.length
        }
    }
}
</script>

<style>

</style>