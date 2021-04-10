<template>
  <h1 class="text-right">{{ group.title }}</h1>
  <h4 class="text-right font-italic font-weight-light">
    {{ group.description }}
  </h4>
  <div class="row mt-1">
    <div class="col-lg-3">
      <NavGroups :slug="group.slug"/>
      <NavTags/>
    </div>
    <div class="col-lg-9 mb-2">
      <template v-if="errorMessage">
        {{ errorMessage }}
      </template>
      <template v-if="listPosts">
        <div v-for="post in listPosts" :key="post.id">
          <PostCard :post="post" :show_all_text="false"/>
        </div>
      </template>
      <template v-else>
        <div class="card not-found h-100 text-center d-flex justify-content-center">
          В этом сообществе ещё нет ни одной записи.
          Не упустите возможность стать первым!
        </div>
      </template>
      <!--      {% endfor %}-->
      <!--      {% if page.has_other_pages %}-->
      <!--      {% include "posts/include/paginator.html" with items=page paginator=paginator %}-->
      <!--      {% endif %}-->
    </div>
  </div>
</template>

<script>

import PostCard from "../components/PostCard";
import UserService from '../services/user.service';
import NavTags from "../components/nav/NavTags";
import NavGroups from "../components/nav/NavGroups";

export default {
  name: 'Group',
  props: ['slug'],
  data() {
    return {
      listPosts: [],
      errorMessage: '',
      group: '',
      ordering: ['-pub_date'],
    }
  },
  components: {
    PostCard,
    NavTags,
    NavGroups,
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
    this.loadListPosts();
    this.loadGroup();
  },
  methods: {
    loadListPosts() {
      UserService.getListPosts(this.ordering, this.filtering).then(
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
    loadGroup() {
      UserService.getGroup(this.groupSlug).then(
          response => {
            this.group = response.data;
          },
          error => {
            this.errorMessage =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      );
    }
  },
  watch: {
    slug() {
      this.loadListPosts();
      this.loadGroup();
    }
  }
}

</script>

<style scoped>

</style>