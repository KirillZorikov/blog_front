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

import {loadPostsMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import PostCard from "../components/PostCard";
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: "Search",
  mixins: [loadPostsMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin],
  title: 'Поиск',
  components: {PostCard, Paginator, Loading},
  data() {
    return {
      loading: false,
      totalPages: 1,
    }
  },
  computed: {
    searchParam() {
      return this.$route.query.search;
    }
  },
  created() {
    this.initUrlParams(this.page);
    this.loadListPosts();
  },
  methods: {
    loadData() {
      this.loadListPosts();
    },
    makeParams() {
      return {search: this.searchParam, page: this.page};
    }
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
    }
  }
}
</script>

<style scoped>

</style>