import { defineStore } from 'pinia'
import axiosClient from '../axios'

interface UserState {
    data: {
        name?: string;
        email?: string;
        imageUrl?: string;
    }
    token: string | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        data: {},
        token: sessionStorage.getItem('token') 
    }),
    actions: {
        logout() {
            this.data = {}
            this.token = null
            sessionStorage.clear()
        },
        register(user: any) {
            // return fetch(`http://localhost:8000/api/register`, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Accept: 'aplication/json'
            //     },
            //     method: 'POST',
            //     body: JSON.stringify(user)
            // })
            //     .then(response => response.json())
            //     .then(response => {
            //         this.token = response.token
            //         this.data = response.user
            //         sessionStorage.setItem('token', response.token)

            //         return response
            //     })
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    this.token = data.token
                    this.data = data.user
                    sessionStorage.setItem('token', data.token)

                    return data
                })
        },
        login(user: any) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    this.token = data.token
                    this.data = data.user
                    sessionStorage.setItem('token', data.token)

                    return data
                })
        },
    }    
})
