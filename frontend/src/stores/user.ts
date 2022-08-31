import { defineStore } from 'pinia';
import axiosClient from '../axios';
import { User } from '../types';

interface State {
    data: User | null 
    token: string | null
    surveys: any[],
    questionTypes: string[]
}

const tmpSurveys = [
    {
        id: 100,
        title: "The codeholic",
        slug: "the-codeholic",
        status: "draft",
        image: "https://picsum.photos/200/300",
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
    },
    {
        id: 200,
        title: "laravel 8",
        slug: "laravel-8",
        status: "active",
        image: "https://picsum.photos/200/302",
        description: `Laravel is a web application framework with ecpressive, elegant syntax`,
        created_at: "2021-12-20 18:00:00",
        updated_at: "2021-12-20 18:00:00",
        expire_date: "2021-12-31 18:00:00",
        questions: [],
    }
]

export const useUserStore = defineStore('user', {
    state: (): State => ({
        data: null,
        token: sessionStorage.getItem('token'),
        surveys: [...tmpSurveys],
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    }),
    actions: {
        logout() {
            return axiosClient.post('/logout')
                .then(response => {
                    this.data = null
                    this.token = null
                    sessionStorage.removeItem('token')
                    
                    return response;
                })
        },
        register(user: any) {
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    this.token = data.token
                    this.data = data.user
                    sessionStorage.setItem('token', data.token)

                    return data
                })
        },
        login(user: User) {
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
