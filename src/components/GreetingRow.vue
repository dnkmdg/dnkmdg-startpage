<template>
    <div class="grid w-2/3 mb-12 text-center">
        <h1 class="mb-1 text-4xl dark:text-white">
            {{ randomGreeting }}!
        </h1>
        <span class="text-xl text-gray-800 dark:text-white">{{ message }}</span>
    </div>
</template>

<script>
const greetings = ['Hello', 'Bonjour', 'Hola', 'Guten tag', 'Hej', 'Salve', 'Nǐ Hǎo', 'Xin chào', 'Hei', 'Ahoj']

export default {
    computed: {
        randomGreeting(){
            const index = Math.floor(Math.random() * greetings.length)

            return greetings[index]
        },

        message(){
            const date = new Date()
            const currentHour = date.getHours()
            const currentMinute = date.getMinutes()
            const currentTime = currentHour + (0.01 * currentMinute)

            if (this.inRange(currentTime, 0, 5.59))
                return 'Det är för sent, gå och lägg dig 😐'
            if (this.inRange(currentTime, 6, 7.59))
                return 'Oj, du är uppe tidigt 🥳'
            if (this.inRange(currentTime, 8, 12.59))
                return 'Framtiden är nu. Nu! 🤗'
            if (this.inRange(currentTime, 13, 16.59))
                return 'Sista rycket nu 🙌'
            if (this.inRange(currentTime, 17, 19.59))
                return 'God kväll ☺️'
            if (this.inRange(currentTime, 20, 24))
                return 'Nu börjar det bli dags att ge upp 🙄'
            else
                return ''
        }
    },

    methods: {
        inRange(number, min, max) {
            return (number >= min && number <= max)
        }
    }
}
</script>