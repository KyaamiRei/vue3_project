import { ref } from 'vue'


export default function useSortedAndSerchedPosts(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndSerchedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    return {
        searchQuery,
        sortedAndSerchedPosts,
    }
}