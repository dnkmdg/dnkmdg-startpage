<template>
    <div class="flex w-screen h-screen pt-20">
        <div class="relative w-4/5 p-8 mx-auto mb-auto bg-gray-800 bg-opacity-[.99] font-fira">
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
        
    }
}
</script>