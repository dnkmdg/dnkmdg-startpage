<template>
    <div class="dark:bg-gray-800 h-[100vh] flex flex-col items-center justify-center w-full">
        <HeaderRow />

        <GreetingRow />

        <BookmarksRow class="w-2/3" />

        <SettingsModal />
    </div>
</template>

<script>
import HeaderRow from '../components/HeaderRow.vue'
import GreetingRow from '../components/GreetingRow.vue'
import BookmarksRow from '../components/BookmarksRow.vue'
import SettingsModal from '../components/SettingsModal.vue'

export default {
    components: {
        HeaderRow,
        GreetingRow,
        BookmarksRow,
        SettingsModal
    }

    
}
</script>

