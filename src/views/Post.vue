<template>
  <Loading v-if="loading" class="loading_message"/>
  <template v-else>
    <div class="row w-100">
      <div class="col-md-3 mb-3 mt-1">
        <div class="card">
          <div class="card-body">
            <div class="h2">
              {{ author.first_name + author.last_name }}
            </div>
            <div class="h3 text-muted">
              <router-link :to="{name: 'Profile', params:{username: author.username}}">
                {{ author.username }}
              </router-link>
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
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <PostCard :post='post' :show_all_text="true"/>
        <div class="mt-3">

          <Comments :postId="id"/>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import {PostService, MiscService} from '../services/user.services';
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import Comments from "../components/comments/Comments";

export default {
  name: "Post",
  title: 'Пост',
  components: {Loading, PostCard, Comments},
  props: ['id'],
  data() {
    return {
      post: '',
      author: '',
      loading: false
    }
  },
  created() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      this.loading = true;
      PostService.getPost(this.id).then(
          response => {
            this.post = response.data;
            this.loadAuthor()
            this.loading = false;
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      )
    },
    loadAuthor() {
      MiscService.getAuthorInfo(this.post.author.username).then(
          response => {
            this.author = response.data;
          }
      )
    }
  }
}
</script>

<style scoped>
.loading_message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: x-large;
}
</style>