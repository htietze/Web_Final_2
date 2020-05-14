<template>
    <div class="summary">

        <!-- the summary component! -->
        <h3>You have visited {{ total }} {{ statesPlural }} </h3>
        <!-- if the visited all prop is true, then this message displays. -->
        <p id="visited-all" v-if="visitedAll">
            You have visited all 50 states and the District of Columbia!
        </p>

    </div>
</template>

<script>
export default {
    name: 'Summary',
    props: {
        total: Number,
        visitedAll: Boolean
    },
    computed: {
        // uses state if total is equivalent to 1, states if it isn't.
        statesPlural() {
            return this.total === 1 ? 'state' : 'states'
        }
    }
}
</script>



<style scoped>
    #visited-all {
        color: green;
        font-weight: 600;
    }
</style>