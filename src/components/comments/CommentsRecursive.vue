<template>
  <div class="comment-box" :class="['level-' + currentComment.level, { replied: currentComment.level !== 0 }]"
  :id="currentComment.id">
    <h6 class="card-subtitle mt-2 text-muted d-flex justify-content-between align-items-center">
      <router-link :to="{name: 'Profile', params:{username: currentComment.author}}">{{ currentComment.author }}
      </router-link>
      <span>{{ parsedDateTime() }}</span>
    </h6>
    <hr>
    <p class="card-text">{{ currentComment.text }}</p>
    <hr>
    <div class="comment-meta">
      <button class="comment-like" :class="{'text-primary': currentComment.liked}"
              @click="likeDislikeComment('like')">
        <i class="far fa-thumbs-up"></i> {{ currentComment.likes_count }}
      </button>
      <button class="comment-dislike ml-1" :class="{'text-danger': currentComment.disliked}"
              @click="likeDislikeComment('dislike')">
        <i class="far fa-thumbs-down"></i> {{ currentComment.dislikes_count }}
      </button>
      <button class="comment-reply reply-popup ml-1" @click="selectToReply">
        <i class="fa fa-reply-all" aria-hidden="true"></i> Ответить
      </button>
    </div>
    <form v-if="selectedComment === currentComment.id" v-on:submit.prevent>
      <div class="card-body mt-2">
        <div class="form-group">
          <textarea class="form-control" required v-model="form.reply" rows="2"></textarea>
        </div>
        <button type="submit" class="btn-primary float-right ml-2" @click="handleReply">Ответить</button>
        <button type="button" class="btn-danger float-right" @click="cancelReply">Отменить</button>
      </div>
    </form>
    <template v-for="comment in comments" :key="comment">
      <CommentsRecursive v-if="comment.parent === currentComment.id" :comments="comments"
                         :currentComment="comment" @reply-created="replyCreated"/>
    </template>
  </div>
</template>

<script>
import {LikeDislikeService, MiscService} from "../../services/user.services";

export default {
  name: "CommentsRecursive",
  props: [
    'currentComment', 'comments'
  ],
  data() {
    return {
      form: {
        reply: ''
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    selectedComment() {
      return this.$store.state.selectedToReplyComment;
    }
  },
  methods: {
    parsedDateTime() {
      let date = this.currentComment.created.split('T')[0].replaceAll('-', '.');
      let time = this.currentComment.created.split('T')[1].split(':').slice(0, 2).join(':');
      return `${date} ${time}`
    },
    likeDislikeComment(arg) {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
      }
      let func = arg === 'like' ? LikeDislikeService.likeComment : LikeDislikeService.dislikeComment
      func(this.currentComment.post, this.currentComment.id).then(
          response => {
            this.currentComment.liked = response.data.liked;
            this.currentComment.disliked = response.data.disliked;
            this.currentComment.likes_count = response.data.likes_count;
            this.currentComment.dislikes_count = response.data.dislikes_count;
          })
    },
    selectToReply() {
      this.$store.commit('changeSelected', this.currentComment.id);
    },
    cancelReply() {
      this.$store.commit('changeSelected', undefined);
    },
    handleReply() {
      if (!this.form.reply) {
        return
      }
      MiscService.addComment(this.currentComment.post, this.form.reply, this.currentComment.id).then(
          response => {
            this.$store.commit('changeSelected', undefined);
            this.replyCreated(response.data.id);
          }
      )
    },
    replyCreated(newCommentId) {
      this.$emit('reply-created', newCommentId);
    }
  }
}
</script>

<style scoped>

</style>