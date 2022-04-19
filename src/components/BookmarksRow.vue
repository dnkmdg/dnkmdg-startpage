<template>
    <div
        class="pb-8 lg:grid lg:gap-6"
        :class="gridClass"
    >
        <div class="absolute bottom-0 right-0 pb-4 pr-4">
            <input
                ref="fauxInput"
                v-model="keyString"
                type="text"
                class="w-0 opacity-0"
                @blur="focusOnTrap"
                @keyup.esc="closeDialog"
            >
            <span
                v-if="keyString"
                class="block px-3 py-2 text-xl uppercase dark:text-white dark:bg-gray-900"
            >{{ keyString }}</span>
        </div>
        
        <div
            v-for="group in groups"
            :key="group.name"
            class="mb-12 text-sm lg:h-full lg:mb-0"
        >
            <h3 class="text-purple-400 dark:text-teal-500">
                {{ group.title }}
            </h3>
            <div class="space-y-1 lg:h-full">
                <button
                    v-for="(link, index) in group.children"
                    :key="`link-${index}`"
                    class="flex items-center w-full px-3 py-3 text-xs transition-all bg-gray-100 dark:text-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    :class="{
                        'bg-gray-300 dark:bg-gray-600 dark:text-teal-400': shouldHightlight(keymap[link.url]) === 1,
                        'bg-purple-200 dark:bg-teal-300 dark:text-gray-800': shouldHightlight(keymap[link.url]) === 2
                    }"
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
                    <span class="pr-2 ml-2 overflow-hidden whitespace-nowrap text-ellipsis">
                        {{ link.title }} 
                    </span>
                    <span
                        class="p-1 px-1 ml-auto text-xs leading-4 text-gray-800 bg-gray-300 bg-opacity-100 rounded-sm dark:text-gray-100 dark:bg-slate-900 min-w-5 shrink-0"
                        :class="{
                            'hidden': !keyboardMode,
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
                class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:text-white dark:bg-gray-800 loading"
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
import hotkeys from 'hotkeys-js'
import data from '../data/faker.json'

import { keys } from '../data/config'

export default {
    data: () => ({
        tree: {
            children: []
        },

        keymap: {},

        goingToUrl: false,

        keyboardMode: false,

        keyString: '',

        keyTrap: null
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

    watch: {
        keyString(to, from){
            clearTimeout(this.keyTrap)

            if(to.length === 0){
                return
            }

            this.keyTrap = setTimeout(() => {
                clearTimeout(this.keyTrap)
                this.keyHandler(to)
            }, 3000)
        }
    },

    async mounted(){
        this.setBookmarks()  
        
        if(window.chrome && window.chrome.runtime){
            chrome.runtime.onMessage.addListener((request) => {
                if(request.type === 'toggle-keyboard-mode'){
                    this.toggleKeyboardMode(request.active)
                }
            })
        }
    },

    methods: {
        shouldHightlight(text){
            const keyString = this.keyString.toUpperCase()

            if(this.keyString && text.startsWith(keyString) && text !== keyString){
                return 1
            }

            if(this.keyString && text === keyString){
                return 2
            }

            return 0
        },

        focusOnTrap(){
            this.$refs.fauxInput.focus()
        },

        keyHandler(keyString){
            const key = keyString.toUpperCase()
            const keyIndex = keys.indexOf(key)
            const bookmark = Object.keys(this.keymap)[keyIndex]

            // console.log(e, key, bookmark, keyIndex, keys)

            if(!this.keyboardMode || !bookmark) {
                window.$log.error('dnkmdg', `${key} is unmapped`)
                this.keyString = ''

                return false
            }

            this.goToUrl(bookmark)
            this.keyString = ''
        },

        toggleKeyboardMode(active){
            this.keyboardMode = active
    
            if(active){
                this.goingToUrl = false
                this.focusOnTrap()
            }
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
            if(window.location.href === url){
                this.closeDialog()
                
                return 
            }
            
            this.goingToUrl = url

            if(!this.keyboardMode){
                window.location = url

                return
            }

            this.sendMessage( { 
                type: 'go-to-url',
                url 
            })
        },

        closeDialog(){
            this.sendMessage({ 
                type: 'close-dialog'
            })
        },

        sendMessage(payload){
            const params = { 
                active: true,
                currentWindow: true 
            }

            chrome.tabs.query(params, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, payload)
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