<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <transition-group name="post-list">
      <item-post 
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    />
    </transition-group>
  </div>
  <h2 v-else style="color: red">
    список пуст
  </h2>
</template>

<script>
import ItemPost from "@/components/ItemPost.vue";

export default {
    components: { 
        ItemPost
    },
    props: {
        posts: {
            type: Array,
            required: true,
        }
    }

}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 18px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move {
  transition: all 0.5s ease;
}
</style>