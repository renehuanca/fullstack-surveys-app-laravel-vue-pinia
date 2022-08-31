<script setup lang="ts">
import { computed, ref } from 'vue';
import { PlusIcon, TrashIcon } from '@heroicons/vue/outline';
import { useUserStore } from '../../stores/user';
import { v4 as uuidv4 } from 'uuid'

interface Props {
    question: object
    index: number
}

const props = defineProps<Props>()

const emit = defineEmits(['change', 'addChange', 'deleteQuestion'])

const model = ref(JSON.parse(JSON.stringify(props.question)));

const user = useUserStore()

const questionTypes = computed(() => user.questionTypes)

function upperCaseFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function shouldHaveOptions() {
    return ['select', 'radio', 'checkbox'].includes(model.value.type)
}

function setOptions(options: any) {
    model.value.data.options = options
}

function getOptions() {
    return model.value.data.options
}

function addOption() {
    setOptions([
        ...getOptions(),
        {uuid: uuidv4(), text: ""}
    ])
    dataChange();
}

function removeOption(op: any) {
    setOptions(getOptions().filter((opt: any) => opt !== op))
    dataChange()
}

function typeChange() {
   if (shouldHaveOptions()) {
    setOptions(getOptions() || [])
   } 
   dataChange()
}

function dataChange() {
    const data = JSON.parse(JSON.stringify(model.value))
    if (!shouldHaveOptions()) {
        delete data.data.options
    } 
    emit('change', data)
}

function addQuestion () {}
function deleteQuestion () {}

</script>

<template>
    <!-- Question index -->
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ props.index + 1 }} {{ model.question }}
        </h3>

        <div class="flex items-center">
            <!-- Add new question -->
            <button type="button" @click="addQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <PlusIcon class="h-3 w-3" /> 
                Add
            </button>
            <!--/ Add new question -->

            <!-- Delete Question -->
            <button type="button" @click="deleteQuestion" class="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600">
               <TrashIcon class="w-3 h-3"/> 
               Delete
            </button>
            <!--/ Delete Question -->
        </div>
    </div>
    <!--/ Question index  -->

    <div class="grid gap-3 grid-cols-12">
        <!-- Question -->
        <div class="mt-3 col-span-9">
            <label :for="'question_text_'+model.data" class="block text-sm font-medium text-gray-700">
                Question Text
            </label>
            <input type="text" :name="'question_text'+model.data" v-model="model.question" @change="dataChange" :id="'question_text'+model.data" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <!--/ Question  -->
        
        <!-- Question Type -->
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-gray-700">
                Select Question Type
            </label>
            <select v-model="model.type" @change="typeChange" name="question_type" id="question_type" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white shadow-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="type in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
        <!--/ Question Type -->
    </div>

    <!-- Question Description -->
    <div class="mt-3 col-span-9">
        <label :for="'question_description'+model.id" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea :name="'question_description'+model.id" :id="'question_description'+model.id" @change="dataChange" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
    </div>
    <!--/ Question Description  -->

    <!-- data -->
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                Options

                <!-- Add new option -->
                <button type="button" @click="addOption()" class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                    <PlusIcon class="w-3 h-3"/>
                    Add Option
                </button>
            </h4>

            <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
                You don't have any options defined
            </div>

            <!-- Option list -->
            <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
                <span class="w-6 text-sm">{{ index + 1 }}. </span>
                <input type="text" v-model="option.text" @change="dataChange" class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500">
            <!-- Delete Options -->
            <button type="button" @click="removeOption(option)" class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                <TrashIcon class="w-4- h-4 text-red-500"/>
            </button>
            </div>
        </div>
    </div>
    <!--/ data -->

    <hr class="my-4">
</template>