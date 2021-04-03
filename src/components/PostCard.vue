<template>
  <div v-if="post" class="card mb-3">
    <template v-if="post.image">
      <img class="card-img" :src="post.image">
    </template>
    <div class="row pr-3 pl-3">
      <div class="col-1 pt-2 pl-3 d-flex flex-column align-items-center">
        <a class="up-vote" href="#">
          <img src="../assets/imgs/postUpvoteIconActive.png" alt="up-vote">
          <!--          {% else %}-->
          <!--          <img src="../assets/imgs/postUpvote.png" alt="up-vote">-->
        </a>
        <small class="rating font-weight-bold">
          {{ post.likes_count }}
        </small>
        <a class="down-vote" href="#">
          <!--          <img src="../assets/imgs/postUpvoteIconActive.png" alt="down-vote">-->
          <!--          {% else %}-->
          <img src="../assets/imgs/postDownvote.png" alt="down-vote">
        </a>
      </div>
      <div class="card-body col-11 pl-3">
        <h6 class="card-subtitle mb-2 text-muted d-flex justify-content-between align-items-center">
          <a href="#">
            {{ post.author.first_name }} {{ post.author.last_name }}
          </a>
          <span v-if="post.group" class="card_group">Запись сообщества:
              <a href="#" class="card-link">
                  {{ post.group.title }}
              </a>
          </span>
        </h6>
        <div class="h7 text-muted">
          <i class="fas fa-user mr-0"></i> {{ post.author.username }}
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
        <a class="card-link">
          <i class="fa fa-comment"></i> Комментарии
        </a>
        <small class="text-muted">({{ post.comments_count }})</small>
        <template v-if="currentUser && currentUser.username === post.author.username">
          <a class="card-link float-right ml-3 card_edit" href="#">
            <i class="far fa-trash-alt"></i> Удалить
          </a>
          <a class="card-link float-right ml-3 card_delete" href="#">
            <i class="fas fa-pencil-alt"></i> Редактировать
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: [
    'post',
    'show_all_text'
  ],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
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