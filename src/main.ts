import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5yYW5nZWxzIiwiYSI6ImNrb3B3OHRsNzAzajEyb21pYWc5M3BxN2gifQ.GfEmw1DpnUIdSRY6R4m-vA';


if (!navigator.geolocation) {
    throw new Error('Tu navegador no soporta el Geolocation')
}

createApp(App).use(store).use(router).mount('#app')
