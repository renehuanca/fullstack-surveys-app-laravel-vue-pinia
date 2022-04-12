import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => ({
        data: {},
        token: null 
    }),
    
})

export {
    useUserStore
}