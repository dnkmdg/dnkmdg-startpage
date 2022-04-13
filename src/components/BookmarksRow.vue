<template>
    <div
        class="w-2/3 lg:grid lg:gap-6"
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
                    <img
                        :src="`https://left-blush-raccoon.faviconkit.com/${getDomain(link.url)}/32`"
                        class="w-6 h-6 align-middle"
                    >
                    <span class="pr-2 ml-2 overflow-hidden text-gray-200 whitespace-nowrap text-ellipsis">
                        {{ link.title }} 
                    </span>
                    <span class="ml-auto text-sm leading-4 text-gray-400">
                        ^{{ keymap[link.url] }}
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
                class="absolute inset-0 flex items-center justify-center text-white bg-gray-700 loading"
            >
                Wait for it...
            </div>
        </Transition>
    </div>
</template>

<script>
import data from '../data/config.json'
import hotkeys from 'hotkeys-js'

const keys = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'

export default {
    data: () => ({
        tree: {
            children: []
        },

        keymap: {},

        goingToUrl: false
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

    mounted(){
        this.setBookmarks()  
    },

    methods: {
        getDomain(url){
            let domain = (new URL(url))

            return domain.hostname.replace('www', '')
        },

        setBookmarks(){
            if(import.meta.env.PROD){
                chrome.bookmarks.getTree((tree) => {
                    this.tree = tree[0].children[0]
                    this.setKeyMap(this.tree.children)
                    console.log(chrome)
                })
            } else {
                this.tree = data
                this.setKeyMap(this.tree.children)
            }            
        },

        goToUrl(url){
            this.goingToUrl = true
            window.location = url
        },

        setKeyMap(bookmarks) {
            for (let i = 0; i < bookmarks.length; i++) {
                const bookmark = bookmarks[i]

                if (bookmark.url) {
                    let index = Object.keys(this.keymap).length
                    let key = keys[index]

                    this.keymap[bookmark.url] = key
                    hotkeys(`ctrl+${key}`, (e) => {
                        e.preventDefault()
                        this.goToUrl(bookmark.url)
                    })
                }

                if (bookmark.children) {
                    this.setKeyMap(bookmark.children)
                }
            }
        }

        
    }
}
</script>