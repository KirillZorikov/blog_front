<template>
  <div class="card mb-3">
    <img class="card-img" :src="post.image">
    <div class="row pr-3 pl-3">
      <div class="col-1 pt-2 pl-3 d-flex flex-column align-items-center">
        <a class="up-vote" href="#">
          <img src="../assets/imgs/postUpvoteIconActive.png" alt="up-vote">
          <!--          {% else %}-->
          <!--          <img src="../assets/imgs/postUpvote.png" alt="up-vote">-->
        </a>
        <small class="rating font-weight-bold">
          500
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
            Лев Николаевич Толстой
          </a>
          <!--          {% if post.group and not skip_group %}-->
          <span class="card_group">Запись сообщества:
                        <a href="#" class="card-link">
                            GreatestLeo
                        </a>
                    </span>
          <!--          {% endif %}-->
        </h6>
        <div class="h7 text-muted">
          <i class="fas fa-user mr-0"></i>{{ post.author }}
          <i class="far fa-calendar-alt mr-0 ml-3"></i>{{ post.pub_date }}
        </div>
        <hr>
        <!--        {% if show_all_text or post.text|bleach|length < 301 %}-->
        {{ post.text }}
        <!--        {% else %}-->
        <!--        <span class="card-text">{{ post.text|bleach|truncatechars_html:300 }}</span>-->
        <!--        {% if post.text|bleach|length > 300 %}-->
        <a href="#"
           class="font-italic font-weight-light">читать далее</a>
        <div>
          <!--          {% for tag in post.tags.all %}-->
          <a href="#" class="card-link ml-0">
            <span class="badge badge-primary">Kotiki</span>
          </a>
          <!--          {% endfor %}-->
        </div>
        <hr>
        <a class="card-link">
          <i class="fa fa-comment"></i> Комментарии
        </a>
        <small class="text-muted">(88)</small>
        <!--        {% if request.user.id == post.author.id %}-->
        <a class="card-link float-right ml-3 card_edit" href="#">
          <i class="far fa-trash-alt"></i> Удалить
        </a>
        <a class="card-link float-right ml-3 card_delete" href="#">
          <i class="fas fa-pencil-alt"></i> Редактировать
        </a>
        <!--        {% endif %}-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ['post']
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