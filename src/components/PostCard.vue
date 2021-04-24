<template>
  <div v-if="post" class="card mb-3">
    <template v-if="post.image">
      <img class="card-img" :src="post.image">
    </template>
    <div class="row pr-3 pl-3">
      <div class="col-1 pt-2 pl-3 d-flex flex-column align-items-center">
        <button class="btn bg-transparent shadow-none down-vote" @click="likeDislikePost('like')">
          <img v-if="liked" src="../assets/imgs/postUpvoteIconActive.png" alt="up-vote">
          <img v-else src="../assets/imgs/postUpvote.png" alt="up-vote">
        </button>
        <small class="rating font-weight-bold">
          {{ rating }}
        </small>
        <button class="btn bg-transparent shadow-none down-vote" @click="likeDislikePost('dislike')">
          <img v-if="disliked" src="../assets/imgs/postDownvoteIconActive.png" alt="down-vote">
          <img v-else src="../assets/imgs/postDownvote.png" alt="down-vote">
        </button>
      </div>
      <div class="card-body col-11 pl-3">
        <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-between align-items-center">
          <router-link v-if="post.author.first_name && post.author.last_name"
                       :to="{name: 'Profile', params: {username: post.author.username}}">
            {{ post.author.first_name }} {{ post.author.last_name }}
          </router-link>
          <span v-else></span>
          <span v-if="post.group" class="card_group">Запись сообщества:
              <router-link :to="{name: 'Group', params: {slug: post.group.slug}}" class="card-link">
                  {{ post.group.title }}
              </router-link>
          </span>
        </h6>
        <div class="h7 text-muted">
          <i class="fas fa-user mr-0"></i>
          <router-link class="text-dark ml-1" :to="{name: 'Profile', params: {username: post.author.username}}">
            {{ post.author.username }}
          </router-link>
          <i class="far fa-calendar-alt mr-0 ml-3"></i> {{ post.pub_date.split('T')[0].replaceAll('-', '.') }}
        </div>
        <hr>
        <template v-if="show_all_text">
          <span v-html="post.text"></span>
        </template>
        <template v-else>
          <span class="" v-html="post.text_preview + '...'"></span>
          <router-link :to="{name: 'Post', params:{id: post.id}}" class="font-italic font-weight-light">
            читать далее
          </router-link>
        </template>
        <div>
          <template v-for="tag in post.tags" :key="tag">
            <a href="#" class="card-link ml-1">
              <span class="badge badge-primary">{{ tag.title }}</span>
            </a>
          </template>
        </div>
        <hr>
        <router-link class="card-link" :to="{name: 'Post', params:{id: post.id}}">
          <i class="fa fa-comment"></i> Комментарии
        </router-link>
        <small class="text-muted">({{ post.comments_count }})</small>
        <template v-if="currentUser && currentUser.username === post.author.username">
          <button class="btn bg-transparent shadow-none float-right ml-3 card_edit text-danger" @click="deletePost">
            <i class="far fa-trash-alt"></i> Удалить
          </button>
          <button class="btn bg-transparent shadow-none float-right ml-3 card_delete text-primary" @click="updatePost">
            <i class="fas fa-pencil-alt"></i> Редактировать
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {LikeDislikeService, PostService} from "../services/user.services";

export default {
  name: "PostCard",
  emits: ['post-deleted'],
  props: [
    'post',
    'show_all_text'
  ],
  data() {
    return {
      liked: this.post.liked,
      disliked: this.post.disliked,
      likes_count: this.post.likes_count,
      dislikes_count: this.post.dislikes_count,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    rating() {
      return this.likes_count - this.dislikes_count;
    },
  },
  methods: {
    likeDislikePost(arg) {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
      }
      let func = arg === 'like' ? LikeDislikeService.likePost : LikeDislikeService.dislikePost
      func(this.post.id).then(
          response => {
            this.liked = response.data.liked;
            this.disliked = response.data.disliked;
            this.likes_count = response.data.likes_count;
            this.dislikes_count = response.data.dislikes_count;
          })
    },
    deletePost() {
      PostService.deletePost(this.post.id).then(
          response => {
            this.$router.push({name: 'Home'});
            this.$emit('post-deleted');
          },
          error => {
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            } else {
              this.$router.push({name: 'Home'});
            }
          })
    },
    updatePost() {
      this.$router.push({name: 'UpdatePost', params: {id: this.post.id}});
    }
  }
}
</script>

<style scoped>
.card-img {
  max-height: 300px;
  max-width: 900px;
  object-position: 0 50%;
  object-fit: cover;
}
</style>