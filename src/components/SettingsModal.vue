<template>
    <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
    >
        <div
            v-show="show"
            class="fixed inset-0 flex bg-gray-300 bg-opacity-30 backdrop-blur-sm"
            @click.self="show = !show"
        >
            <div class="self-center w-1/3 p-8 mx-auto space-y-2 bg-white rounded">
                <div class="flex w-full">
                    <span class="text-lg font-medium">
                        Settings
                    </span>

                    <button
                        class="ml-auto"
                        @click="show = !show"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="{2}"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                
                <ThemeSetting />
                <FontSetting />
            </div>
        </div>
    </Transition>

    <div
        v-if="!noButton"
        class="absolute bottom-0 right-0 flex m-8 dark:text-gray-200 gray-600 "
        @click="show = !show"
    >
        <button class="ml-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>
</template>


<script>
import ThemeSetting from '../components/ThemeSetting.vue'
import FontSetting from '../components/FontSetting.vue'

export default {
    components: {
        ThemeSetting,
        FontSetting
    },

    props: {
        noButton: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        show: false
    })
}
</script>