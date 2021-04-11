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
      <Menu :ordering="ordering" @ordering-changed="actionOrderingChanged"/>
      <template v-if="errorMessage">
        {{ message }}
      </template>
      <template v-else>
        <div v-for="post in listPosts" :key="post.id">
          <PostCard :post="post" :show_all_text="false"/>
        </div>
      </template>
      <template v-if="totalPages > 1">
        <Paginator :total="totalPages" :page="page" @page-changed="actionPageChanged"/>
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
      ordering: '-pub_date',
      page: 1,
      totalPages: 1
    }
  },
  computed: {
    pageStateOptions() {
      return {
        ordering: this.ordering,
        page: this.page
      };
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
    this.ordering = windowData.ordering ? windowData.ordering : '-pub_date';
    if (windowData.page) {
      this.page = parseInt(windowData.page);
    }
    this.loadListPosts(this.ordering);
  },
  methods: {
    actionPageChanged(pageNumber) {
      this.page = pageNumber;
      this.loadListPosts();
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
    actionOrderingChanged(ordering) {
      this.ordering = ordering;
      this.loadListPosts();
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
    loadListPosts() {
      let ordering = this.ordering;
      if (!this.ordering.includes('pub_date')) {
        ordering = [this.ordering, '-pub_date'];
      }
      UserService.getListPosts(ordering, this.page).then(
          response => {
            this.listPosts = response.data.response;
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.errorMessage =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
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
    // $route(to, from) {
    //   if (to.fullPath === '/') {
    //     this.page = 1;
    //     this.ordering = '-pub_date';
    //     this.loadListPosts();
    //   }
    // }
  }
}
</script>
