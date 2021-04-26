<template>

  <div class="col-md-9">
    <h1 class="text-right">Посты избранных авторов</h1>
    <Menu/>
    <template v-if="posts.length">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" :show_all_text="false" @post-deleted="loadListPosts"/>
      </div>
    </template>
    <template v-else>
      <div class="card not-found h-100 text-center d-flex justify-content-center">
        <Loading v-if="loading"/>
        <p v-else>Вы ещё ни на кого не подписаны!</p>
      </div>
    </template>
    <template v-if="totalPages > 1">
      <Paginator :total="totalPages"/>
    </template>
  </div>

</template>

<script>

import PostCard from "../components/PostCard";
import {FollowService} from '../services/user.services';
import {initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";
import Menu from "../components/Menu";

export default {
  name: "Follow",
  mixins: [initUrlParamsMixin, watchPageMixin, computedPageMixin],
  title: 'Посты избранных авторов',
  components: {
    Menu,
    Loading,
    Paginator,
    PostCard,
  },
  data() {
    return {
      loading: false,
      totalPages: 1,
    }
  },
  created() {
    this.initUrlParams(this.page)
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPosts();
    },
    loadListPosts() {
      this.loading = true;
      FollowService.getListFollowingPosts(this.page).then(
          response => {
            this.loading = false;

            this.$store.commit('changePosts', response.data.response);
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    },
  }
}
</script>

<style scoped>

</style>