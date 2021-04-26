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
import {GroupTagsService} from '../services/user.services';
import {loadPostsMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import Paginator from "../components/Paginator";
import Loading from "../components/Loading";

export default {
  name: 'Tag',
  mixins: [loadPostsMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin],
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
  created() {
    this.initUrlParams(this.page);
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListPosts();
      this.loadTag();
    },
    makeParams() {
      return {page: this.page, tag: this.slug};
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
    slug() {
      this.loadData()
    }
  }
}

</script>

<style scoped>

</style>