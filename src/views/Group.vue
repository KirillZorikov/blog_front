<template>
  <div class="col-lg-9 mb-2">
    <h4 class="text-right font-italic font-weight-light">
      {{ group.description }}
    </h4>
    <Menu/>
    <template v-if="posts.length">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" :show_all_text="false" @rating-changed="loadListPosts"/>
      </div>
    </template>
    <template v-else>
      <div class="card not-found h-100 text-center d-flex justify-content-center">
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
import {GroupTagsService} from '../services/user.services';
import {loadPostsMixin, initUrlParamsMixin, watchPageOrderingMixin, computedPageOrderingMixin} from "../mixins"
import Paginator from "../components/Paginator";
import Menu from "../components/Menu";
import Loading from "../components/Loading";
import SideBar from "../components/SideBar";

export default {
  name: 'Group',
  mixins: [loadPostsMixin, initUrlParamsMixin, watchPageOrderingMixin, computedPageOrderingMixin],
  title: 'Записи сообщества',
  props: ['slug'],
  data() {
    return {
      loading: false,
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
    }
  },
  created() {
    this.initUrlParams(this.page, this.ordering);
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPosts();
      this.loadGroup();
    },
    makeParams() {
      return Object.assign({ordering: this.ordering, page: this.page}, this.filtering)
    },
    loadGroup() {
      if (this.groupSlug) {
        GroupTagsService.getGroup(this.groupSlug).then(
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
    slug() {
      this.loadData()
    }
  }
}

</script>

<style scoped>

</style>