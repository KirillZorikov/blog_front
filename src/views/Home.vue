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
      <Menu :ordering="ordering" @order-changed="loadListPosts"/>
      <template v-if="errorMessage">
        {{ message }}
      </template>
      <template v-else>
        <div v-for="post in listPosts" :key="post.id">
          <PostCard :post="post" :show_all_text="false"/>
        </div>
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

export default {
  name: 'Home',
  props:[
      'message'
  ],
  data() {
    return {
      listPosts: [],
      group: '',
      errorMessage: '',
      ordering: '-pub_date',
      page: 1
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
    Menu,
    PostCard,
    NavTags,
    NavGroups,
  },
  created() {
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );
    this.ordering = windowData.ordering ? windowData.ordering:'-pub_date';
    if (windowData.page) {
      this.page = windowData.page;
    }

    // const VALID_KEYS = ["ordering", "page"];
    //
    // VALID_KEYS.forEach(key => {
    //   if (windowData[key]) {
    //     this[key] = windowData[key];
    //   }
    // });
    this.loadListPosts(this.ordering);
  },
  methods: {
    loadListPosts(ordering) {
      this.ordering = ordering
      if (!ordering.includes('pub_date')) {
        ordering = [ordering, '-pub_date']
      }
      console.log(ordering)
      UserService.getListPosts(ordering).then(
          response => {
            this.listPosts = response.data.response;
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
      // window.history.pushState(
      //   null,
      //   document.title,
      //   `${window.location.pathname}?ordering=${value.ordering.toString()}&page=${value.page}`
      // );
      this.$router.push(`${window.location.pathname}?ordering=${value.ordering.toString()}&page=${value.page}`)
    }

  }
}
</script>
