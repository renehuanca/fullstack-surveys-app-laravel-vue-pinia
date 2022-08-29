<script setup lang="ts">
import { computed } from 'vue'
import PageComponent from '../components/PageComponent.vue'
import { useUserStore } from '../stores/user'
import { PencilIcon, TrashIcon } from '@heroicons/vue/outline';

const surveys = computed(() => useUserStore().surveys)

function deleteSurvey(survey: any) {
  if(confirm("Are you sure you want to delete this survey? Operation can't be undone!!")) {
     
  }
}
</script>

<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{name: 'SurveyCreate'}"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new survey
        </router-link>
      </div>
    </template>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="survey in surveys" 
        :key="survey.id"
        class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
      >
        <img :src="survey.image" alt="" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
        <div v-html="survey.description" class="overflow-hidden flex-1"></div>
        
        <div class="flex justify-between items-center">
          <router-link
            :to="{name: 'SurveyView', params: {id: survey.id}}"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indig-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          >
            <PencilIcon class="h-4 w-4 inline-block mr-2"/>
            Edit
          </router-link>
          <button
            v-if="survey.id"
            type="button"
            @click="deleteSurvey(survey)"
            class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon class="h-5 w-5 inline-block" />
          </button>
        </div>
      </div>
    </div>
  </PageComponent>
</template>