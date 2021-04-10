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

export default {
  name: 'Home',
  props:[
      'message'
  ],
  data() {
    return {
      listPosts: [],
      group: '',
      errorMessage: ''
    }
  },
  components: {
    PostCard,
    NavTags,
    NavGroups,
  },
  created() {
    this.loadListPosts();
  },
  methods: {
    loadListPosts() {
      UserService.getListPosts().then(
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
  }
}
</script>
