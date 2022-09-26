import axios from "axios";
import { ref , onMounted} from 'vue';


export default function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(true)
    const fetching = async () => {
        try {
            setTimeout( async () => {
                const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                    params: {
                        _page: 1,
                        _limit: limit,
                    }
                });
                totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit)
                posts.value = responce.data;
            }, 1000)
        } catch (e) {
            alert('Error')
        } finally {
            isPostLoading.value = false;
        }
    }
    
    onMounted(() => {
        fetching
    })

    return {
        posts,
        totalPages,
        isPostLoading,

    }
};