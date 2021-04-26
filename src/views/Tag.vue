<template>
  <div class="col-lg-9 mb-2">
    <h4 class="text-right font-italic font-weight-light">
      Посты по тегу: {{ tag.title }}
    </h4>
    <template v-if="posts.length">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" :show_all_text="false" @rating-changed="loadListPosts"/>
      </div>
    </template>
    <template v-else>
      <div class="card not-found h-100 text-center d-flex justify-content-center">
        <Loading v-if="loading"/>
        <p v-else>
          По этому тегу ещё нет постов.
          Не упустите возможность стать первым!
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
import {GroupTagsService, PostService} from '../services/user.services';
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: 'Tag',
  title: 'Посты по тегу',
  props: ['slug'],
  data() {
    return {
      loading: false,
      totalPages: 1,
      tag: ''
    }
  },
  components: {
    Loading,
    PostCard,
    Paginator,
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
    page() {
      return this.$store.state.page;
    },
    posts() {
      return this.$store.state.posts;
    }
  },
  created() {
    this.initUrlParams();
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPosts();
      this.loadTag();
    },
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
      let params = {page: this.page, tag: this.slug};
      PostService.getListPosts(params).then(
          response => {
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
    loadTag() {
      GroupTagsService.getTag(this.slug).then(
          response => {
            this.tag = response.data;
          },
          error => {
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    }
  },
  watch: {
    pageStateOptions(value) {
      if (value.page === 1) {
        this.$router.push(`${window.location.pathname}`);
      } else {
        this.$router.push(`${window.location.pathname}?page=${value.page}`);
      }
    },
    slug() {
      this.loadData()
    },
    page() {
      this.loadData()
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