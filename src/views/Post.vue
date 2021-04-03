<template>
  <div class="row">
    <div class="col-md-3 mb-3 mt-1">
      <div class="card">
        <div class="card-body">
          <div class="h2">
            {{ author.first_name + author.last_name }}
          </div>
          <div class="h3 text-muted">
            <a href="#">
              {{ author.username }}
            </a>
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
              Записей: {{ author.posts_count }}
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-9">
      <PostCard :post='post' :show_all_text="true"/>
      <div class="mt-3">
        <!--        Comments-->
      </div>
    </div>

  </div>

</template>

<script>
import UserService from '../services/user.service';
import PostCard from "@/components/PostCard";

export default {
  name: "Post",
  components: {PostCard},
  props: ['id'],
  data() {
    return {
      post: '',
      author: '',
    }
  },
  created() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      UserService.getPost(this.id).then(
          response => {
            this.post = response.data;
            this.loadAuthor()
          }
      )
    },
    loadAuthor() {
      UserService.getAuthorInfo(this.post.author.username).then(
          response => {
            this.author = response.data;
          }
      )
    }
  }
}
</script>

<style scoped>

</style>