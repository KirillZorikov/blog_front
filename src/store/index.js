import { createStore } from 'vuex'



export const store = createStore({
  state: {
    backendUrl: "http://127.0.0.1:8000/api/v1"
  },
  getters: {
    getServerUrl: state => {
      return state.backendUrl
    }
  }
})
