<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="Поиск по названию"
        ></my-input>
        <div class="app__btns">
            <my-button
            >
                Создать пост
            </my-button>

            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        
        <my-dialog 
        > 
            <post-form
            />
        </my-dialog>

        <post-list  
            :posts="sortedAndSerchedPosts"
            v-if="!isPostLoading"
        />
        <div v-else>
            Loading...
        </div>
    </div>
</template>


<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MySelect from '@/components/UI/MySelect.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSerchedPosts from '@/hooks/useSortedAndSerchedPosts';

export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MySelect,
},
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ],
        }
    },
    setup(props) {
        const { posts, totalPages, isPostLoading } = usePosts(10);
        const { selectedSort, sortedPosts } = useSortedPosts(posts);
        const { searchQuery, sortedAndSerchedPosts } = useSortedAndSerchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostLoading,
            selectedSort,
            sortedPosts,
            searchQuery,
            sortedAndSerchedPosts,
        }
    }
}
</script>

<style scoped>
.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid green;
}
.observer {
    height: 30px;
    background: black;
}
</style>
