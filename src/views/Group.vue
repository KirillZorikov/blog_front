<template>
  <div class="col-lg-9 mb-2">
    <h4 class="text-right font-italic font-weight-light">
      {{ group.description }}
    </h4>
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
          В этом сообществе ещё нет ни одной записи.
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
import UserService from '../services/user.service';
import Paginator from "../components/Paginator";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import SideBar from "../components/SideBar";

export default {
  name: 'Group',
  props: ['slug'],
  data() {
    return {
      loading: false,
      errorMessage: '',
      group: '',
      totalPages: 1,
    }
  },
  components: {
    SideBar,
    Loading,
    PostCard,
    Paginator,
    Menu,
  },
  computed: {
    groupSlug() {
      return this.$route.params.slug;
    },
    filtering() {
      return {group: this.groupSlug};
    },
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
  created() {
    this.loadListPosts();
  },
  methods: {
    loadListPosts() {
      this.loading = true;
      UserService.getListPosts(this.ordering, this.page, this.filtering).then(
          response => {
            this.$store.commit('changePosts', response.data.response);
            this.totalPages = response.data['pages_count'];
            this.loadGroup();
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
    loadGroup() {
      if (this.groupSlug) {
        UserService.getGroup(this.groupSlug).then(
            response => {
              this.group = response.data;
              this.loading = false;
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
      }
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
    slug() {
      this.loadListPosts()
    },
    page() {
      this.loadListPosts()
    },
    ordering() {
      this.loadListPosts()
    },
    $route() {
      if (this.$route.name !== 'Group') {
        this.$store.commit('changePage', 1);
        this.$store.commit('changeOrdering', '-pub_date');
      }
    }
  }
}

</script>

<style scoped>

</style>