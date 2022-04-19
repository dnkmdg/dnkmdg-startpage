<template>
    <label
        for="boringToggle"
        class="flex items-center ml-auto cursor-pointer"
    >
        <div class="relative">
            
            <input
                id="boringToggle"
                v-model="boringmode"
                type="checkbox"
                class="sr-only"
                @change="toggleBoringMode"
            >
        
            <div class="block h-8 transition bg-gray-200 rounded-full dot-track w-14" />
        
            <div class="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1" />
        </div>
        
        <div class="ml-3 font-medium text-gray-700 dark:text-gray-400">
            Boring mode?
        </div>
    </label>
</template>

<script>
export default {
    data: () => ({
        boringmode: false
    }),

    mounted(){
        this.checkBoringMode()
    },

    methods: {
        toggleBoringMode(){
            if(this.boringmode === true){
                chrome.storage.sync.set({ 'font': 'inter' })
            } else {
                chrome.storage.sync.set({ 'font': 'fira' })
            }

            this.checkBoringMode()
        },

        checkBoringMode(){
            const el = document.querySelector('#app.dnkmdg')

            chrome.storage.sync.get('font', data => {
                if (data.font && data.font === 'inter') {
                    this.boringmode = true
                    el.classList.remove('font-fira')
                    el.classList.add('font-inter')
                    // console.log('boringmode', true, data)
                } else {
                    el.classList.remove('font-inter')
                    el.classList.add('font-fira')
                    // console.log('boringmode', false, data)
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