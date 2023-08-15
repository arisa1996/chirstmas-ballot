import '@/styles/index.scss'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import App from './app.vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)

const install = async() => {
    const vuetify = new Vuetify({
        icons: {
            iconfont: 'mdi'
        },
        theme: {
            themes: {
                light: {
                    primary: '#64C3FA',
                    secondary: '#C1935F'
                }
            },
            options: {
                customProperties: true
            }
        }
    })
    new Vue({
        vuetify,
        render: h => h(App)
    }).$mount('#app')
}

install()
