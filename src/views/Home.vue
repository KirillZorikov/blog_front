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
import {PostService} from '../services/user.services';
import Menu from "../components/Menu";
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: 'Home',
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
  computed: {
    pageStateOptions() {
      return {
        ordering: this.ordering,
        page: this.page
      };
    },
    queryParams() {
      return {
        ordering: this.$route.query.ordering,
        page: this.$route.query.page
      };
    },
    page() {
      return this.$store.state.page;
    },
    ordering() {
      return this.$store.state.ordering;
    },
    posts() {
      return this.$store.state.posts;
    },
  },
  components: {
    Loading,
    Paginator,
    Menu,
    PostCard,
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
      if (windowData.ordering) {
        this.$store.commit('changeOrdering', windowData.ordering);
      }
      if (windowData.page) {
        this.$store.commit('changePage', parseInt(windowData.page));
      }
    },
    loadListPosts() {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.loading = true;
      let params = {ordering: this.ordering, page: this.page};
      PostService.getListPosts(params).then(
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
  },
  watch: {
    pageStateOptions(value) {
      let url = '';
      if (this.ordering === '-pub_date') {
        if (this.page !== 1) {
          url = `${window.location.pathname}?page=${value.page}`;
        }
      } else {
        if (this.page === 1) {
          url = `${window.location.pathname}?ordering=${value.ordering.toString()}`;
        } else {
          url = `${window.location.pathname}?ordering=${value.ordering.toString()}&page=${value.page}`;
        }
      }
      this.$router.push(url);
    },
    page() {
      this.loadListPosts()
    },
    ordering() {
      this.loadListPosts();
    },
    $route() {
      if (this.$route.name !== this.$options.name) {
        this.$store.commit('changePage', 1);
        this.$store.commit('changeOrdering', '-pub_date');
      }
    },
    queryParams(to) {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.$store.commit('changePage', to.page ? parseInt(to.page): 1)
      this.$store.commit('changeOrdering', to.ordering ? to.ordering: '-pub_date');
    }
  }
}
</script>
