import {createStore} from 'vuex'
import {auth} from './auth.module';


export const store = createStore({
    modules: {
        auth
    },
    state: {
        page: 1,
        ordering: '-pub_date',
        posts: []
    },
    getters: {
        getPage: state => {
            return state.page
        },
        getOrdering: state => {
            return state.ordering
        },
        getPosts: state => {
            return state.posts
        }
    },
    mutations: {
        changePage(state, newPage) {
            state.page = newPage
        },
        changeOrdering(state, newOrdering) {
            state.ordering = newOrdering
        },
        changePosts(state, newPosts) {
            state.posts = newPosts
        }
    }
})
