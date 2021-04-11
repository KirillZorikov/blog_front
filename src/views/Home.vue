<template>
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
  <div class="row mt-1">
    <div class="col-lg-3">
      <NavGroups/>
      <NavTags/>
    </div>
    <div class="col-lg-9">
      <Menu/>
      <template v-if="errorMessage">
        <div class="card not-found h-100 text-center d-flex justify-content-center">
          {{ errorMessage }}
        </div>
      </template>
      <template v-else>
        <div v-for="post in listPosts" :key="post.id">
          <PostCard :post="post" :show_all_text="false"/>
        </div>
      </template>
      <template v-if="totalPages > 1">
        <Paginator :total="totalPages"/>
      </template>
    </div>
  </div>
</template>

<script>

import PostCard from "../components/PostCard";
import UserService from '../services/user.service';
import NavTags from "../components/nav/NavTags";
import NavGroups from "../components/nav/NavGroups";
import Menu from "../components/Menu";
import Paginator from "../components/Paginator";

export default {
  name: 'Home',
  props: [
    'message'
  ],
  data() {
    return {
      listPosts: [],
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
    }
  },
  components: {
    Paginator,
    Menu,
    PostCard,
    NavTags,
    NavGroups,
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
      UserService.getListPosts(this.ordering, this.page).then(
          response => {
            this.listPosts = response.data.response;
            this.totalPages = response.data['pages_count'];
          },
          error => {
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            } else {
              this.errorMessage = error.response.data;
            }
          }
      );
    },
    reLoadListPosts() {
      this.loadListPosts();
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
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
      this.reLoadListPosts()
    },
    ordering() {
      this.reLoadListPosts()
    },
    $route(to, from) {
      if (to.fullPath === '/') {
        this.$store.commit('changePage', 1);
        this.$store.commit('changeOrdering', '-pub_date');
      }
    }
  }
}
</script>
