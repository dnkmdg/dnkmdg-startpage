<template>
    <div class="relative flex w-screen h-screen pt-20 bg-gray-300 bg-opacity-30 backdrop-blur-sm">
        <div
            class="relative w-4/5 p-8 mx-auto mb-auto dark:bg-gray-900 bg-white bg-opacity-[.99] drop-shadow-3xl rounded"
            @click.self="sendMessage({type: 'close-dialog'})"
        >
            <BookmarksRow />
            <SettingsModal no-button />
        </div>
    </div>
</template>

<script>
import BookmarksRow from '../components/BookmarksRow.vue'
import SettingsModal from '../components/SettingsModal.vue'

export default {
    components: {
        BookmarksRow,
        SettingsModal
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