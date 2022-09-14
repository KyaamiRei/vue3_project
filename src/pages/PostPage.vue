<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск по названию"
        ></my-input>
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>

            <my-select
                v-model="selectedSort"
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

        <div ref="observer" class="observer">

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
import axios from 'axios';
import MySelect from '@/components/UI/MySelect.vue';

export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MySelect,
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ],
        }
    },
    methods: {
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
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                setTimeout( async () => {
                    const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        }
                    });
                    this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
                    this.posts = responce.data;
                    this.isPostLoading = false;
                }, 1000)
            } catch (e) {
                alert('Error')
            } finally {

            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                setTimeout( async () => {
                    const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        }
                    });
                    this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...responce.data];
                }, 1000)
            } catch (e) {
                alert('Error')
            } finally {

            }
        },
    },
    mounted() {
        this.fetchPosts();
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSerchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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
