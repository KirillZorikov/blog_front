import { createStore } from 'vuex'
import { auth } from './auth.module';


export const store = createStore({
  modules: {
    auth
  },
  state: {
    backendUrl: "http://127.0.0.1:8000/api/v1"
  },
  getters: {
    getServerUrl: state => {
      return state.backendUrl
    }
  }
})
