import { createRouter, createWebHistory } from "vue-router"

import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import PostDatail from '@/pages/PostDatail'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostDatail
    },
]

const router = createRouter(
    {
        routes,
        history: createWebHistory(process.env.BASE_URL)
    }
)

export default router;