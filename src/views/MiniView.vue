<template>
    <div class="flex w-screen h-screen pt-20 bg-gray-300 bg-opacity-30">
        <div
            class="relative w-4/5 p-8 mx-auto mb-auto bg-gray-900 bg-opacity-[.99] font-fira drop-shadow-3xl rounded"
            @click.self="sendMessage({type: 'close-dialog'})"
        >
            <BookmarksRow />
        </div>
    </div>
</template>

<script>
import BookmarksRow from '../components/BookmarksRow.vue'

export default {
    components: {
        BookmarksRow
    },

    mounted(){
        
    },

    methods: {
        sendMessage(payload){
            const params = { 
                active: true,
                currentWindow: true 
            }

            chrome.tabs.query(params, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, payload)
            })
        }
    }
}
</script>