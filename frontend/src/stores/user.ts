import { defineStore } from 'pinia'
import axiosClient from '../axios'

interface UserState {
    data: {
        name?: string;
        email?: string;
        imageUrl?: string;
    }
    token: string | null;
    surveys: any[]
}

const tmpSurveys = [
    {
        id: 100,
        title: "The codeholic",
        slug: "the-codeholic",
        status: "draft",
        image: "http://lorem.com ",
        description: "this is a description",
        created_at: "2011-12-20 18:00:00",
        updated_at: "2011-12-20 18:00:00",
        expire_date: "2011-12-20 18:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "from which country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "19287398dsf7sdfs-32423-423-423-4-234",
                            text: "USA"
                        },
                        {
                            uuid: "19287398dsf7sdasds-32423-423-423-4-234",
                            text: "Germany"
                        },
                    ],
                }
            },
            {
                id: 2,
                type: "checkbox",
                question: "Which language videos do you want to see on my channel?",
                description: "lorem impusm dolor sit amet",
                data: {
                    options: [
                        {
                            uuid: "19287398dsf7sdfs-32423-423-423-4-234",
                            text: "JavaScript"
                        },
                        {
                            uuid: "19287398dsf7sdasds-32423-423-423-4-234",
                            text: "Html + CSS"
                        },
                    ],
                }
            },
            {
                id: 3,
                type: "radio",
                question: "how are you?",
                description: "lorem impusm dolor sit amet",
                data: {
                    options: [
                        {
                            uuid: "19287398dsf7sdfs-32423-423-423-4-234",
                            text: "fine"
                        },
                        {
                            uuid: "19287398dsf7sdasds-32423-423-423-4-234",
                            text: "sad"
                        },
                    ],
                }
            },
            {
                id: 4,
                type: "text",
                question: "what is your favorite channel in youtube?",
                description: null,
                data: {}
            },
            {
                id: 1,
                type: "textarea",
                question: "What do you think about TheCodeholic channel?",
                description: "whirte your honest opinion, Everything is anonymus.",
                data: {}
            }
        ]
    }
]

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        data: {},
        token: sessionStorage.getItem('token'),
        surveys: [...tmpSurveys]
    }),
    actions: {
        logout() {
            return axiosClient.post(`/logout`)
                .then(response => {
                    this.data = {}
                    this.token = null
                    sessionStorage.removeItem('token')
                    
                    return response;
                })
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
