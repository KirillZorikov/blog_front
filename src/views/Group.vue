<template>
  <h4 class="text-right font-italic font-weight-light">
    {{ group.description }}
  </h4>
  <div class="row mt-1">
    <div class="col-lg-3">
      <NavGroups :slug="group.slug"/>
      <NavTags/>
    </div>
    <div class="col-lg-9 mb-2">
      <Menu/>
      <template v-if="listPosts.length">
        <div v-for="post in listPosts" :key="post.id">
          <PostCard :post="post" :show_all_text="false"/>
        </div>
      </template>
      <template v-else>
        <div class="card not-found h-100 text-center d-flex justify-content-center">
          <p v-if="errorMessage">{{ errorMessage }}</p>
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
  </div>
</template>

<script>

import PostCard from "../components/PostCard";
import UserService from '../services/user.service';
import NavTags from "../components/nav/NavTags";
import NavGroups from "../components/nav/NavGroups";
import Paginator from "../components/Paginator";
import Menu from "../components/Menu";

export default {
  name: 'Group',
  props: ['slug'],
  data() {
    return {
      listPosts: [],
      errorMessage: '',
      group: '',
      totalPages: 1,
    }
  },
  components: {
    PostCard,
    NavTags,
    NavGroups,
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
    }
  },
  created() {
    this.loadListPosts();
  },
  methods: {
    loadListPosts() {
      UserService.getListPosts(this.ordering, this.page, this.filtering).then(
          response => {
            this.listPosts = response.data.response;
            this.loadGroup();
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
    loadGroup() {
      UserService.getGroup(this.groupSlug).then(
          response => {
            this.group = response.data;
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
    slug() {
      this.reLoadListPosts()
    },
    page() {
      this.reLoadListPosts()
    },
    ordering() {
      this.reLoadListPosts()
    }
  }
}

</script>

<style scoped>

</style>