<template>
  <div class="list-group mb-5 groups">
    <h4 class="card-header">Сообщества</h4>
    <template v-for="group in listGroups" :key="group">
      <router-link v-if="slug && slug === group.slug" :to="{name: 'Group', params:{slug: group.slug}}"
         class="list-group-item list-group-item-action disabled active">
        {{ group.title }}
        <span class="badge badge-dark float-right">{{ group.posts_count }}</span>
      </router-link>
      <router-link v-else :to="{name: 'Group', params:{slug: group.slug}}" class="list-group-item list-group-item-action">
        {{ group.title }}
        <span class="badge badge-dark float-right">{{ group.posts_count }}</span>
      </router-link>
    </template>
  </div>
</template>


<script>
import UserService from '@/services/user.service';

export default {
  name: "NavGroups",
  data() {
    return {
      listGroups: [],
    }
  },
  props: [
      'slug'
  ],
  created() {
    this.loadListGroups()
  },
  methods: {
    loadListGroups() {
      UserService.getListGroups().then(
          response => {
            this.listGroups = response.data;
          },
      );
    }
  }
}
</script>

<style scoped>

</style>