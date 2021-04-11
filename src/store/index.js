import {createStore} from 'vuex'
import {auth} from './auth.module';


export const store = createStore({
    modules: {
        auth
    },
    state: {
        page: 1,
        ordering: '-pub_date',
    },
    getters: {
        getPage: state => {
            return state.page
        },
        getOrdering: state => {
            return state.ordering
        }
    },
    mutations: {
        changePage(state, newPage) {
            state.page = newPage
        },
        changeOrdering(state, newOrdering) {
            state.ordering = newOrdering
        }
    }
})
