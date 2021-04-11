<template>

  <div class="row pl-4 pr-3 mb-0 d-flex justify-content-between align-items-end">
    <template v-if="currentUser">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link text-dark {% if index %}active{% endif %}"
             href="{% url 'index' %}">
            Все авторы
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-dark {% if follow %}active{% endif %}"
             href="{% url 'follow_index' %}">
            Избранные авторы
          </a>
        </li>
      </ul>
    </template>
    <div></div>
    <div class="dropdown show sort">
      <a class="btn btn-dark btn-sm dropdown-toggle shadow-none" href="#" role="button" id="dropdownMenuLink"
         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Сортировка по
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <button class="dropdown-item" :class="{active: ordering.includes('pub_date')}"
                @click="changeOrdering('-pub_date')">
          <!--           href="/?ordering=pub-date"-->

          <i class="far fa-calendar-alt"></i> Дате публикации
        </button>
        <button class="dropdown-item" :class="{active: ordering.includes('comments_count')}"
                @click="changeOrdering('-comments_count')">
          <!--           href="/?ordering=comments_count">-->
          <i class="far fa-comment"></i> Кол-ву комментов
        </button>
        <button class="dropdown-item" :class="{active: ordering.includes('rating')}"
                @click="changeOrdering('-rating')">
          <!--           href="/?ordering=rating"-->

          <i class="far fa-thumbs-up"></i> Рейтингу
        </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Menu",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ordering() {
      return this.$store.state.ordering;
    },
  },
  methods: {
    changeOrdering(ordering) {
      this.$store.commit('changePage', 1);
      this.$store.commit('changeOrdering', ordering);
    }
  }
}
</script>

<style scoped>

</style>