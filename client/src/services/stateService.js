import axios from 'axios'

// axios routes! so these are for doing API interaction.
// I'm not entirely sure how this connects to the API from here. 
// I know that components send requests for API data to axios' methods set here
// then those path extensions are added to the end of the API server's url, which results in
// json data that can be returned to the appropriate component.
// Getters and Setters essentially.
export default {
    getAll() {
        return axios.get('/api/states/').then( response => {
            return response.data
        })
    },

    setVisited(stateName, visited) {
        return axios.patch('/api/state/'+ stateName, { visited: visited }).then(response => {
            return response.data
        })
    },

    setJournal(stateName, journal) {
        return axios.patch('/api/journal/'+ stateName, { journal: journal }).then(response => {
            return response.data
        })
    },

    getOne(stateName) {
        return axios.get('/api/states/' + stateName).then( response => {
            return response.data
        })
    }
}