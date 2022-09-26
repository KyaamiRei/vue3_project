import axios from "axios"


export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 0,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
        ],
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSerchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort (state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                setTimeout( async () => {
                    const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    });
                    commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limit));
                    commit('setPosts', responce.data);
                }, 1000)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1);
                setTimeout( async () => {
                    const responce = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    });
                    commit('setTotalPages', Math.ceil(responce.headers['x-total-count'] / state.limit));
                    commit('setPosts', [...state.posts, ...responce.data]);
                }, 1000)
            } catch (e) {
                console.log(e)
            } finally {

            }
        },
    },
    namespaced: true
}