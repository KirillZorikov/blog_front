<template>
  <div class="list-group mb-5 groups">
    <h4 class="card-header">Сообщества</h4>
    <template v-for="group in listGroups" :key="group">
      <router-link :to="{name: 'Group', params:{slug: group.slug}}" class="list-group-item list-group-item-action"
                   :class="{'disabled active': slug && slug === group.slug}">
        {{ group.title }}
        <span class="badge badge-dark float-right">{{ group.posts_count }}</span>
      </router-link>
    </template>
  </div>
</template>


<script>
import UserService from '../../services/user.service';

export default {
  name: "NavGroups",
  data() {
    return {
      listGroups: [],
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    posts() {
      return this.$store.state.posts;
    }
  },
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
  },
  watch: {
    posts() {
      this.loadListGroups();
    }
  }
}
</script>

<style scoped>

</style>