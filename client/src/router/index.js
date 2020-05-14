// associates base url path with statelist component?
// sets home page?

// initializing the router for vue,
import Router from 'vue-router'
// importing the components so that the routes can direct to them
import StateList from '@/components/StateList'
import About from '@/components/About'
import StateDetail from '@/components/StateDetail'
import FullMap from '@/components/FullMap'
import StateJournal from '@/components/StateJournal'

// each route has a path tagged onto the end of the url, and directs it to the component
// where the main directory routing section was for API routing, this is for
// routing to components in the site itself.
export default new Router({
    routes: [
        {
            path: '/',
            component: StateList
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/detail/:state',
            name: 'detail',
            component: StateDetail
        },
        {
            path: '/journal/:state',
            name: 'journal',
            component: StateJournal
        },
        {
            path: '/fullmap',
            component: FullMap
        }
    ]
})