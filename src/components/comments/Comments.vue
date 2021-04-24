<template>
  <div class="card my-4" v-if="currentUser">
    <form @submit.prevent="handleAddComment">
      <h6 class="card-subtitle ml-4 mt-3">Добавить комментарий:</h6>
      <div class="card-body">
        <div class="form-group">
          <textarea class="form-control" required v-model="form.text" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-default float-right mb-2 text-light">Отправить</button>
      </div>
    </form>
  </div>

  <div class="comments">
    <template v-if="comments.length" v-for="comment in comments" :key="comment">
      <CommentsRecursive v-if="comment.parent === null" :comments="comments"
                         :currentComment="comment" @reply-created="loadListComments"/>
    </template>
    <div v-if="loading && !comments.length" class="card not-found h-100 text-center d-flex justify-content-center">
      <Loading />
    </div>
  </div>
</template>

<script>

import {MiscService} from "../../services/user.services";
import CommentsRecursive from "./CommentsRecursive";
import Loading from "../Loading";

export default {
  name: "Comments",
  props: [
    'postId'
  ],
  components: {CommentsRecursive, Loading},
  data() {
    return {
      loading: false,
      comments: [],
      form: {
        text: ''
      }
    }
  },
  created() {
    this.loadListComments();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    loadListComments(newCommentId) {
      this.loading = true;
      MiscService.getListComment(this.postId).then(
          response => {
            this.loading = false;
            this.comments = response.data;
            if (newCommentId) {
              this.scrollToNewComment(newCommentId)
            }
          }
      )
    },
    scrollToNewComment(id) {
      let checkExist = setInterval(function () {
        if ($(`#${id}`).length) {
          let element = document.getElementById(id);
          element.scrollIntoView({behavior: 'smooth'});
          clearInterval(checkExist);
        }
      }, 100);
    },
    handleAddComment() {
      MiscService.addComment(this.postId, this.form.text).then(
          response => {
            this.loadListComments(response.data.id);
          }
      )
    }
  }
}
</script>

<style scoped>

</style>