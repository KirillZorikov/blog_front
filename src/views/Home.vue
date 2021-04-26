<template>
  <div class="col-lg-9">
    <h1 v-if="ordering.includes('date')" class="text-right">Последние обновления на сайте</h1>
    <h1 v-if="ordering.includes('comments')" class="text-right">Самые обсуждаемые посты</h1>
    <h1 v-if="ordering.includes('rating')" class="text-right">Самые рейтинговые посты</h1>
    <!---->
    <div v-if="message" class="row mt-1 mb-1">
      <div class="alert alert-success m-auto" role="alert">
        {{ message }}
        <button type="button" class="close ml-3" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <!---->
    <Menu/>
    <template v-if="posts.length">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" :show_all_text="false" @post-deleted="loadListPosts" @rating-changed="loadListPosts"/>
      </div>
    </template>
    <template v-else>
      <div class="card not-found h-100 text-center d-flex justify-content-center">
        <Loading v-if="loading"/>
        <p v-else>
          Похоже ещё никто не оставлял свои записи на этом замечательном сайте.
        </p>
      </div>
    </template>
    <template v-if="totalPages > 1">
      <Paginator :total="totalPages"/>
    </template>
  </div>
</template>

<script>

import PostCard from "../components/PostCard";
import {loadPostsMixin, initUrlParamsMixin, watchPageOrderingMixin, computedPageOrderingMixin} from "../mixins"
import Menu from "../components/Menu";
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: 'Home',
  mixins: [loadPostsMixin, initUrlParamsMixin, watchPageOrderingMixin, computedPageOrderingMixin],
  title: 'Главная страница',
  props: [
    'message'
  ],
  data() {
    return {
      loading: false,
      totalPages: 1
    }
  },
  components: {
    Loading,
    Paginator,
    Menu,
    PostCard,
  },
  created() {
    this.initUrlParams(this.page, this.ordering);
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPosts();
    },
    makeParams() {
      return {ordering: this.ordering, page: this.page};
    }
  }
}
</script>
