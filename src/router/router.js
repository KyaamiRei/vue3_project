import { createRouter, createWebHistory } from "vue-router"

import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import PostDatail from '@/pages/PostDatail'
import PostPageWithVuex from '@/pages/PostPageWithVuex'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi'

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
    {
        path: '/store',
        component: PostPageWithVuex
    },
    // {
    //     path: '/compApi',
    //     component: PostPageCompositionApi
    // },
]

const router = createRouter(
    {
        routes,
        history: createWebHistory(process.env.BASE_URL)
    }
)

export default router;