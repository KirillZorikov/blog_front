<template>
  <div class="col-lg-9">
    <h1 class="text-right">Последние обновления на сайте</h1>
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
        <PostCard :post="post" :show_all_text="false"/>
      </div>
    </template>
    <template v-else>
      <div class="card not-found h-100 text-center d-flex justify-content-center">
        <p v-if="errorMessage">{{ errorMessage }}</p>
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
import UserService from '../services/user.service';
import Menu from "../components/Menu";
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";
import SideBar from "../components/SideBar";

export default {
  name: 'Home',
  props: [
    'message'
  ],
  data() {
    return {
      loading: false,
      group: '',
      errorMessage: '',
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
    page() {
      return this.$store.state.page;
    },
    ordering() {
      return this.$store.state.ordering;
    },
    posts() {
      return this.$store.state.posts;
    }
  },
  components: {
    SideBar,
    Loading,
    Paginator,
    Menu,
    PostCard,
  },
  created() {
    const windowData = Object.fromEntries(
        new URL(window.location).searchParams.entries()
    );
    if (windowData.ordering) {
      this.$store.commit('changeOrdering', windowData.ordering);
    }
    if (windowData.page) {
      this.$store.commit('changePage', parseInt(windowData.page));
    }
    this.loadListPosts();
  },
  methods: {
    loadListPosts() {
      this.loading = true;
      UserService.getListPosts(this.ordering, this.page).then(
          response => {
            this.loading = false;
            this.$store.commit('changePosts', response.data.response);
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            } else {
              this.errorMessage = error.response.data;
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
      this.loadListPosts()
    },
    $route(to, from) {
      if (to.fullPath === '/' || this.$route.name === 'Group' || this.$route.name === 'Tag') {
        this.$store.commit('changePage', 1);
        this.$store.commit('changeOrdering', '-pub_date');
      }
    }
  }
}
</script>
