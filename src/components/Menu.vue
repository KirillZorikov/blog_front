<template>
  <div class="row pl-4 pr-3 mb-0 d-flex justify-content-between align-items-end">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link text-dark" :class="{active: $route.name === 'Home'}"
                     :to="{name: 'Home'}">
          Все авторы
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-dark" :class="{active: $route.name === 'Follow'}"
                     :to="{name: 'Follow'}">
          Избранные авторы
        </router-link>
      </li>
    </ul>
    <div></div>
    <div v-if="$route.name !== 'Follow'" class="dropdown show sort">
      <a class="btn btn-dark btn-sm dropdown-toggle shadow-none" href="#" role="button" id="dropdownMenuLink"
         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Сортировка по
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <button class="dropdown-item" :class="{active: ordering.includes('pub_date')}"
                @click="changeOrdering('-pub_date')">
          <i class="far fa-calendar-alt"></i> Дате публикации
        </button>
        <button class="dropdown-item" :class="{active: ordering.includes('comments_count')}"
                @click="changeOrdering('-comments_count')">
          <i class="far fa-comment"></i> Кол-ву комментов
        </button>
        <button class="dropdown-item" :class="{active: ordering.includes('rating')}"
                @click="changeOrdering('-rating')">
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