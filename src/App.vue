<template>
    <div class="bg-gray-800 h-[100vh] flex flex-col items-center justify-center font-fira">
        <HeaderRow />

        <GreetingRow />

        <BookmarksRow />

        <SettingsModal class="hidden" />
    </div>
</template>

<script>
import HeaderRow from './components/HeaderRow.vue'
import GreetingRow from './components/GreetingRow.vue'
import BookmarksRow from './components/BookmarksRow.vue'
import SettingsModal from './components/SettingsModal.vue'

export default {
    components: {
        HeaderRow,
        GreetingRow,
        BookmarksRow,
        SettingsModal
    },

    mounted(){
        
    }
}
</script>