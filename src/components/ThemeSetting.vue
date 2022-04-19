<template>
    <label
        for="toggleB"
        class="flex items-center ml-auto cursor-pointer"
    >
        <!-- toggle -->
        <div class="relative">
            <!-- input -->
            <input
                id="toggleB"
                v-model="darkmode"
                type="checkbox"
                class="sr-only"
                @change="toggleDarkMode"
            >
            <!-- line -->
            <div class="block h-8 transition bg-gray-200 rounded-full dot-track w-14" />
            <!-- dot -->
            <div class="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1" />
        </div>
        <!-- label -->
        <div class="ml-3 font-medium text-gray-700 dark:text-gray-400">
            Dark mode?
        </div>
    </label>
</template>

<script>
export default {
    data: () => ({
        darkmode: false
    }),

    mounted(){
        this.checkDarkMode()
    },

    methods: {
        toggleDarkMode(){
            if(this.darkmode === true){
                chrome.storage.sync.set({ 'theme': 'dark' })
            } else {
                chrome.storage.sync.set({ 'theme': 'light' })
            }

            this.checkDarkMode()
        },

        checkDarkMode(){
            const el = document.querySelector('#app.dnkmdg')

            chrome.storage.sync.get('theme', data => {
                if (data.theme === 'dark' || (!('theme' in Object.keys(data)) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    this.darkmode = true
                    el.classList.add('dark')
                    // console.log('darkmode', true, data)
                } else {
                    el.classList.remove('dark')
                    // console.log('darkmode', false, data)
                }
            })
        }
    }
}
</script>

<style scoped>
/* Toggle A */
input:checked ~ .dot {
  transform: translateX(100%);
}

input:checked ~ .dot-track {
  @apply bg-gray-600
}
</style>