<template>
  <div class="row w-100">
    <div class="col-md-3 mb-3 mt-1">
      <div class="card">
        <div class="card-body">
          <div class="h2">
            {{ author.last_name }} {{ author.first_name }}
          </div>
          <div class="h3 text-dark">
            {{ author.username }}
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="h6 text-muted">
              Подписчиков: {{ author.following_count }}<br/>
              Подписан: {{ author.followers_count }}
            </div>
          </li>
          <li class="list-group-item">
            <div class="h6 text-muted">
              Постов: {{ author.posts_count }}
            </div>
          </li>
          <li class="list-group-item" :class="{disabled: currentUser && currentUser.username === author.username}">
            <button v-if="followed" class="btn btn-lg btn-light"
                    @click="deleteFollow">
              Отписаться
            </button>
            <button v-else class="btn btn-lg btn-primary"
                    :class="{disabled: currentUser && currentUser.username === author.username}"
                    @click="addFollow">
              Подписаться
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-9">
      <template v-if="posts.length">
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" :show_all_text="false" @post-deleted="loadListPosts"/>
        </div>
      </template>
      <template v-else>
        <div class="card not-found h-100 text-center d-flex justify-content-center">
          <Loading v-if="loading"/>
          <p v-else>У этого автора ещё нет никаких постов.</p>
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
import {PostService, FollowService, MiscService} from '../services/user.services';
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: "Profile",
  title () {
    return `Профиль пользователя: ${this.username}`
  },
  props: ['username'],
  components: {
    Loading,
    Paginator,
    PostCard,
  },
  data() {
    return {
      loading: false,
      totalPages: 1,
      author: '',
      followed: false,
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
    page() {
      return this.$store.state.page;
    },
    posts() {
      return this.$store.state.posts;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.initUrlParams();
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPosts();
      this.loadAuthor();
      this.loadFollow();
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
      this.loading = true;
      PostService.getListPostsByUser(this.username, this.page).then(
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
    loadAuthor() {
      MiscService.getAuthorInfo(this.username).then(
          response => {
            this.author = response.data;
          },
          error => {
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      )
    },
    loadFollow() {
      if (!this.currentUser) {
        return
      }
      FollowService.getListFollow(this.username).then(
          response => {
            this.followed = response.data.map(x => x.author).includes(this.username);
          }
      )
    },
    addFollow() {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
        return
      }
      FollowService.addFollow(this.username).then(
          response => {
            this.followed = true;
          }
      )
    },
    deleteFollow() {
      FollowService.deleteFollow(this.username).then(
          response => {
            this.followed = false;
          }
      )
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
    page() {
      this.loadListPosts()
    },
    followed() {
      this.loadAuthor()
    },
    username() {
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
      this.$store.commit('changePage', to.page ? parseInt(to.page) : 1)
    }
  }
}
</script>

<style scoped>

</style>