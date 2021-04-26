<template>
  <div class="col-lg-9 mb-2">
    <h4 class="text-right font-italic font-weight-light">
      Поиск по запросу: {{ searchParam }}
    </h4>
    <template v-if="posts.length">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" :show_all_text="false"/>
      </div>
    </template>
    <template v-else>
      <div class="card not-found h-100 text-center d-flex justify-content-center">
        <Loading v-if="loading"/>
        <p v-else>
          Ничего не найдено.
        </p>
      </div>
    </template>
    <template v-if="totalPages > 1">
      <Paginator :total="totalPages"/>
    </template>
  </div>
</template>

<script>

import {PostService} from "../services/user.services";
import PostCard from "../components/PostCard";
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: "Search",
  title: 'Поиск',
  components: {PostCard, Paginator, Loading},
  data() {
    return {
      loading: false,
      totalPages: 1,
    }
  },
  computed: {
    pageStateOptions() {
      return {
        page: this.page
      };
    },
    queryParams() {
      return {
        page: this.$route.query.page
      };
    },
    searchParam() {
      return this.$route.query.search;
    },
    posts() {
      return this.$store.state.posts;
    },
    page() {
      return this.$store.state.page;
    },
  },
  created() {
    this.initUrlParams();
    this.loadListPosts();
  },
  methods: {
    initUrlParams() {
      const windowData = Object.fromEntries(
          new URL(window.location).searchParams.entries()
      );
      if (windowData.page) {
        this.$store.commit('changePage', parseInt(windowData.page));
      }
    },
    loadListPosts() {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.loading = true;
      let params = {search: this.searchParam, page: this.page};
      PostService.getListPosts(params).then(
          response => {
            this.loading = false;
            this.$store.commit('changePosts', response.data.response);
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.loading = false;
            if (error.response && error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    },
  },
  watch: {
    pageStateOptions(value) {
      if (value.page === 1) {
        this.$router.push(`${window.location.pathname}?search=${this.searchParam}`);
      } else {
        this.$router.push(`${window.location.pathname}?search=${this.searchParam}&page=${value.page}`);
      }
    },
    searchParam() {
      this.loadListPosts();
    },
    page() {
      this.loadListPosts();
    },
    $route() {
      if (this.$route.name !== this.$options.name) {
        this.$store.commit('changePage', 1);
      }
    },
    queryParams(to) {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.$store.commit('changePage', to.page ? parseInt(to.page): 1)
    }
  }
}
</script>

<style scoped>

</style>