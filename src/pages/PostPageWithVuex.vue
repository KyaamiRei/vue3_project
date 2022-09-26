<template>
    <div>
        <div>
            <my-button
                @click="$store.commit('incrementLikes')"
            >
                like
            </my-button>
            <my-button
                @click="$store.commit('decrementLikes')"
            >
                dislike
            </my-button>
        </div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск по названию"
        ></my-input>
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>

            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        
        <my-dialog 
            v-model:show="dialogVisible"
        > 
            <post-form
                @create="createPost"
            />
        </my-dialog>

        <post-list  
            :posts="sortedAndSerchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        />
        <div v-else>
            Loading...
        </div>

        <div v-intersection="loadMorePosts" class="observer">

        </div>

        <!-- Пагинация  -->
        <!-- <div class="page__wrapper">
            <div
                v-for="pageNumbet in totalPages"
                :key="pageNumbet"
                class="page"
                :class="{
                    'current-page': page === pageNumbet
                }"
                @click="changePage(pageNumbet)"
            >
                {{ pageNumbet }}
            </div>
        </div> -->
    </div>
</template>


<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MySelect from '@/components/UI/MySelect.vue';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

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
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        // changePage(pageNumbet) {
        //     this.page = pageNumbet
        // },
        
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSerchedPosts: 'post/sortedAndSerchedPosts',
        })
    },
    watch: {
        // page() {
        //     this.fetchPosts()
        // }
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
