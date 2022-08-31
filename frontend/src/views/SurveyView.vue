<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import QuestionEditor from '../components/editor/QuestionEditor.vue';
import PageComponent from '../components/PageComponent.vue';
import { useUserStore } from '../stores/user';
import { reactive } from 'vue';

const route = useRoute()

interface Survey {
    id: null;
    title: string;
    status: boolean;
    description: undefined;
    image: null;
    expire_date: null;
    questions: {
        id: string;
    }[];
}
const model = reactive({
    id: null,
    title: '',
    status: false,
    description: undefined,
    image: null,
    expire_date: null,
    questions: []
})

if (route.params.id) {
    const userStore = useUserStore()
    const source = userStore.surveys.find((survey: any) => {
        console.log(route.params.id)
        return survey.id == route.params.id // add parse int route params id
    })
    Object.assign(model, source)
}

function saveSurvey() {

}

function addQuestion() {
    console.log('Add ¿question')
}

function questionChange() {

}

function deleteQuestion() {

}
</script>

<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{  model.id ? model.title : "Create a Survey"  }}
                </h1>
            </div>
        </template>

        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex item-center">
                            <img v-if="model.image" :src="model.image" :alt="model.title"
                                class="w-64 h-48 object-cover rounded-md shadow-md">
                            <span v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <div>
                                <button type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <input type="file"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                                    Change
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    <!--/ Image -->

                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <!--/ Title -->

                    <!-- Description -->
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <div class="mt-1">
                            <textarea id="description" name="description" rows="3" v-model="model.description"
                                autocomplete="survey_description"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Describe your survey" />
                        </div>
                    </div>
                    <!--/ Description -->

                    <!-- Expire Date -->
                    <div>
                        <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
                        <input type="date" name="expire_date" v-model="model.expire_date"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                    <!--/ Expire Date -->

                    <!-- Status -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input type="checkbox" id="status" name="status" v-model="model.status"
                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">
                                Active
                            </label>
                        </div>
                    </div>
                    <!--/ Status -->
                </div>
                <!--/ Survey Fields -->

                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3 class="text-2xl font-semibold flex items-center justify-between">
                        Questions
                        <!-- Add New Question -->
                        <button type="button" class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700" @click="addQuestion">
                            <PlusIcon class="h-3 w-3"/>
                            Add Question
                        </button>
                        <!--/ Add New Question -->
                    </h3>
                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        You don't have any questions created
                    </div>
                    <div v-for="(question, index) in model.questions" :key="index">
                        <QuestionEditor :question="question" :index="index" @change="questionChange" @addQuestion="addQuestion" @deleteQuestion="deleteQuestion"/>
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hove:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>