<template>
    <div class="state-summary p-2 rounded">

        <span class="m-2">{{ state.name }}</span>
        <p>
            <!-- each state has a connected checkbox, that can emit the change, which then runs a method
            in the StateList.vue component. -->
            <input id="visited" class="m-2" type="checkbox"
            v-model="stateVisited" v-on:change="$emit('isVisited', stateName, stateVisited)">
        </p>

        <p>
            <!-- router links within each State component, that link to its specific detail and journal pages -->
            <router-link v-bind:to="{ name: 'detail', params: { state: stateName } }">
                <img class="icon" src="@/assets/icons8-map-64.png">
            </router-link>
            <router-link v-bind:to="{ name: 'journal', params: { state: stateName } }">
                <img class="icon" src="@/assets/icons8-bookmark-64.png">
            </router-link>
        </p>

    </div>
</template>

<script>
export default {
    name: 'State',
    props: {
        state: Object
    },
    data() {
        return {
            stateName: this.state.name,
            stateVisited: this.state.visited,
        }
    }
}
</script>

<style scoped>
    /* read up on ems, they match the font size, aren't based on screen pixels.
    seems pretty neat */
    .state-summary {
        height: 8em;
        width: 10em;
        border: 1px #EEE solid;
        background-color: whitesmoke;
    }

    .icon {
        width: 2em;
        height: 2em;
    }
</style>