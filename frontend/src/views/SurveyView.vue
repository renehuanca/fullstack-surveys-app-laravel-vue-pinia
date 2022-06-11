<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageComponent from '../components/PageComponent.vue'
import { useUserStore } from '../stores/user'

const route = useRoute()

let model = ref({
    id: null,
    title: '',
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: []
})

if (route.params.id) {
    const userStore = useUserStore()
    model.value = userStore.surveys.find((survey: any) => {
        return survey.id === route.params.id // add parse int route params id
    })
}

function saveSurvey() {

}
</script>

<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survey"}} 
                </h1>
            </div> 
        </template>
        
        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- Image -->
                <div>
                    <label for="" class="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <div class="mt-1 flex item-center">
                        <img v-if="model.image" :src="model.image" :alt="model.title" class="w-64 h-48 object-cover">
                        <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <button type="button" class="relative overflow-hidden ml-5 bg-border py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <input type="file" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                            Change
                        </button>
                    </div>
                </div>
                
                </div>
            </div>
        </form>
    </PageComponent>
</template>