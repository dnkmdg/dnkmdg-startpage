<template>
    <div
        class="lg:grid lg:gap-6"
        :class="gridClass"
    >
        <div
            v-for="group in groups"
            :key="group.name"
            class="mb-12 text-sm lg:h-full lg:mb-0"
        >
            <h3 class="text-teal-500 ">
                {{ group.title }}
            </h3>
            <div class="space-y-1 lg:h-full">
                <button
                    v-for="(link, index) in group.children"
                    :key="`link-${index}`"
                    class="flex items-center w-full px-3 py-3 text-xs transition-all bg-gray-700 hover:bg-gray-600"
                    @click="goToUrl(link.url)"
                >
                    <!-- <img
                        :src="`https://left-blush-raccoon.faviconkit.com/${getDomain(link.url)}/32`"
                        class="w-6 h-6 align-middle"
                    > -->
                    <img
                        :src="`chrome://favicon/size/64@1x/${getDomain(link.url)}`"
                        class="w-6 h-6 align-middle"
                    >
                    <span class="pr-2 ml-2 overflow-hidden text-gray-200 whitespace-nowrap text-ellipsis">
                        {{ link.title }} 
                    </span>
                    <span
                        class="w-5 p-1 ml-auto text-xs leading-4 text-gray-500 bg-gray-800 rounded-sm bg-opacity-30 shrink-0"
                        :class="{
                            'text-gray-100 bg-slate-900 bg-opacity-100': keyboardMode
                        }"
                    >
                        {{ keymap[link.url] }}
                    </span>
                </button>
            </div>
        </div>

        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
        >
            <div
                v-if="goingToUrl"
                class="absolute inset-0 flex items-center justify-center text-white bg-gray-800 loading"
            >
                <img
                    :src="`chrome://favicon/size/64@1x/${getDomain(goingToUrl)}`"
                    class="w-6 h-6 mr-2 align-middle"
                >
                Läser in {{ goingToUrl }}...
            </div>
        </Transition>
    </div>
</template>

<script>
import data from '../data/config.json'
import hotkeys from 'hotkeys-js'

const keys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'U', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'
    // '^0', '^1', '^2', '^3', '^4', '^5', '^6', '^7', '^8', '^9', 
    // '^A', '^B', '^C', '^D', '^E', '^F', '^G', '^H', '^I', '^J', 
    // '^K', '^L', '^M', '^N', '^O', '^P', '^Q', '^R', '^S', '^T', 
    // '^U', '^V', '^X', '^Y', '^Z', '^Å', '^Ä', '^Ö' 
]

export default {
    data: () => ({
        tree: {
            children: []
        },

        keymap: {},

        goingToUrl: false,

        keyboardMode: false
    }),

    computed: {
        groups(){
            return this.tree.children
        },

        gridClass(){
            switch(this.groups.length){
            case 1: 
                return 'grid-cols-1'
            case 2: 
                return 'grid-cols-2'
            case 3: 
                return 'grid-cols-3'
            case 4: 
                return 'grid-cols-4'
            case 5: 
                return 'grid-cols-5'
            case 6: 
                return 'grid-cols-6'
            }

            return 'flex'
        }  
    },

    async mounted(){
        this.setBookmarks()  
        
        chrome.runtime.onMessage.addListener((request) => {
            if(request.type === 'toggle-keyboard-mode'){
                this.toggleKeyboardMode(request.active)
            }
        })

        hotkeys('*', (e) => {
            const key = e.key.toUpperCase()
            const keyIndex = keys.indexOf(key)
            const bookmark = Object.keys(this.keymap)[keyIndex]

            console.log(e, key, bookmark, keyIndex, keys)

            if(!this.keyboardMode || !bookmark || e.metaKey) {
                if(e.keyCode === 27){
                    this.closeDialog()
                }
            
                return 
            }

            e.preventDefault()
            this.goToUrl(bookmark)
        })
    },

    methods: {
        async toggleKeyboardMode(active){
            this.keyboardMode = active
            window.focus()
        },

        getDomain(url){
            let domain = (new URL(url))

            return domain.origin
        },

        setBookmarks(){
            if(import.meta.env.PROD){
                chrome.bookmarks.getTree((tree) => {
                    this.tree = tree[0].children[0]
                    this.setKeyMap(this.tree.children)
                })
            } else {
                this.tree = data
                this.setKeyMap(this.tree.children)
            }            
        },

        goToUrl(url){
            this.goingToUrl = url

            if(!this.keyboardMode){
                window.location = url

                return
            }
            
            const params = { 
                active: true,
                currentWindow: true 
            }

            chrome.tabs.query(params, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { 
                    type: 'go-to-url',
                    url 
                })
            })
        },

        closeDialog(){
            const params = { 
                active: true,
                currentWindow: true 
            }

            chrome.tabs.query(params, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { 
                    type: 'close-dialog'
                })
            })
        },

        setKeyMap(bookmarks) {
            for (let i = 0; i < bookmarks.length; i++) {
                const bookmark = bookmarks[i]

                if (bookmark.url) {
                    let index = Object.keys(this.keymap).length
                    let key = keys[index]

                    this.keymap[bookmark.url] = key
                }

                if (bookmark.children) {
                    this.setKeyMap(bookmark.children)
                }
            }
        }

        
    }
}
</script>