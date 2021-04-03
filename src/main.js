import {createApp} from 'vue'
import {store} from './store'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

axios.interceptors.response.use((response) => {
        // Return a successful response back to the calling service
        return response;
    }, (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (error.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        } else {
            localStorage.removeItem('user');
            this.$router.push('/login');
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
)

app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')

