<template>
    <div>

<!-- it worked last night, didn't today, panicked, fixed it... -->


        <h3 class="m-2">Journal for {{ state.name }} </h3>

        <!-- Each state journal has an edit check to make sure data isn't accidentally saved or deleted -->
        <label for="edit">edit?</label>
        <input id="edit" type="checkbox" v-model="edit">

        <!-- If the edit box is checked, then the text is changed to a text area, allowing for writing -->
        <div v-if="edit">
        <textarea id="journal" rows="10" cols="50" v-model="state.journal">
        </textarea>
        <!-- Added a last minute text count because it annoyed me. -->
        <p id="characterCount">{{ state.journal | countCharacters }}/1000</p>
        <br>
        <!-- additionally, a button will run the method to save it, only appearing when Edit is checked
        and it'll uncheck edit after it's been saved. -->
        <button id="saveButton" class="btn btn-primary mt-2" type="button"
            v-on:click="updateJournal(state.name, state.journal), edit=false">
                Save Journal
        </button>
        </div>

        <p id="savedJournal" v-else="">
            {{ state.journal }}
        </p>

    </div>
</template>

<script>
export default {
    name: 'StateJournal',
    data() {
        return {
            state: {
                name: '',
                journal: ''
            },
            edit: ''
        }
    },
    // pulls in the state data on loading
    mounted() {
        this.state.name = this.$route.params.state
        this.fetchStateData()
    },
    methods: {
        fetchStateData() {
            this.$stateService.getOne( this.state.name ).then( data => {
                this.state = data
            })
        },
        // almost killed me. So it sends the state name and journal to the stateService.js
        // where it's then told to use axios' patch route of the server/api/journal/stateName
        // this then goes to the main directory states.js
        // which runs router.patch using the path /journal/:name (the state name)
        // I almost died in the woods on that. could not figure out how updating the visited field routed through.
        updateJournal(stateName, stateJournal) {
            this.$stateService.setJournal(stateName, stateJournal).then( ()  => {
                this.fetchStateData()
            })
        }
    },
    // filter to simply take the max set length of the journal field, 
    // which the config has set to 1000 now.
    filters: {
        countCharacters: function(string) {
                return 1000-(string.length)
            }
        }
}
</script>

<style scoped>

    #savedJournal {
        word-wrap: break-word;
        margin-left: 20%;
        margin-right: 20%;
        text-align: left;
        background-color: whitesmoke;
    }

    #characterCount {
        color: lightgray
    }
</style>