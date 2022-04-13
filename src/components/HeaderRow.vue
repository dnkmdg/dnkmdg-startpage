<template>
    <div class="inset-x-0 top-0 flex w-2/3 h-24 pt-8 mb-12 text-gray-400 lg:w-full lg:px-8 lg:absolute lg:flex-row">
        <div class="flex flex-col">
            <span class="text-sm capitalize">{{ day }}</span>
            <span class="text-3xl">{{ time }}</span>
        </div>
            
        <div
            v-if="weather"
            class="flex ml-auto text-sm lg:text-right"
        >
            <div class="flex flex-col">
                <span>Det är {{ Math.round(weather.main.temp) }}°C ute, men känns mer som {{ Math.round(weather.main.feels_like) }}°C</span>
                <span>Det blåser {{ weather.wind.speed }} m/s {{ degreesToReadable(weather.wind.deg) }}lig vind</span>
            </div>
            <div class="flex items-center justify-center h-10 ml-2">
                <img
                    :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
                    class="h-16"
                >
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'

const azimuthHumans = ['nord', 'nordöst', 'öst', 'sydöst', 'syd', 'sydväst', 'väst', 'nordväst', 'nord']

export default {
    data: () => ({
        time: null,
        weather: null
    }),

    computed: {
        day(){
            return dayjs().format('dddd, D MMMM, YYYY')
        }
    },

    mounted(){
        this.setTime()
        this.getPosition()
    },

    methods: {
        getWindStyle(wind){
            let style = {
                transform: `rotate(${wind.deg}deg)`,
                display: 'inline-block'
            }

            if(wind.deg > 0 && wind.deg < 180){
                style.transform += ' scaleX(-1)'
            }

            return style
        },

        setTime(){
            this.time = dayjs().format('HH:mm:ss')
            
            setInterval(() => {
                this.time = dayjs().format('HH:mm:ss')
            }, 1000)
        },

        degreesToReadable(deg){
            return azimuthHumans[ Math.round(deg/45) ]
        },

        async getPosition(){
            navigator.geolocation.getCurrentPosition(this.getWeather, error => {
                console.error('Can\'t get position')
            })           
        },

        async getWeather(position){
            const appId = 'fd2c04ed7f9802656bd2cc23bddc7ad9'
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appId}&units=metric`

            const { data } = await axios.get(url)

            this.weather = data
        }
    }
}
</script>