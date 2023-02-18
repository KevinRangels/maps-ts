import { defineComponent, ref, onMounted, watch } from 'vue';
import { usePlacesStore } from '@/composables';
import Mapboxgl from 'mapbox-gl';

export default defineComponent({
  name: 'MapView',
  components: {},
  setup() {

    const mapElement = ref<HTMLDivElement>()
    const {userLocation, isUserLocationReady} = usePlacesStore()

    const initMap = async () => {
        if( !mapElement.value ) throw new Error('Div Element no exist')
        if( !userLocation.value ) throw new Error('user location no exist')

        await Promise.resolve()

        const map = new Mapboxgl.Map({
            container: mapElement.value, // container ID
            style: 'mapbox://styles/mapbox/dark-v10', // style URL
            center: userLocation.value, // starting position [lng, lat]
            zoom: 15, // starting zoom
        });

        const myLocationPopup = new Mapboxgl.Popup({ offset: [0,-25] })
            .setLngLat(userLocation.value)
            .setHTML(`
                <h4>Aqui estoy</h4>
                <p>Actualmente en Sabaneta</p>
            `)

        const myLocationMarker = new Mapboxgl.Marker()
            .setLngLat(userLocation.value)
            .setPopup(myLocationPopup)
            .addTo(map)
    }

    onMounted( () => {
        if (isUserLocationReady.value) return initMap()
        console.log('No tengo localización aún');
    })

    watch(isUserLocationReady, (newVal) => {
        if (isUserLocationReady.value) initMap()
    })

    return {
        userLocation,
        isUserLocationReady,
        mapElement
    }
  }
});