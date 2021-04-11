<template>
  <nav aria-label="Переключение страниц" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link"
           href="#">
          &laquo;
        </a>
      </li>

      <template v-for="pageNumber in total" :key="pageNumber">
        <li class="page-item" :class="{'active': pageNumber === page}">
          <span v-if="pageNumber === page" class="page-link">
            {{ pageNumber }}
          </span>
          <button v-else class="page-link"
                  @click="changePage(pageNumber)">
            {{ pageNumber }}
          </button>
        </li>
      </template>

      <li class="page-item">
        <a class="page-link"
           href="#">
          &raquo;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Paginator",
  props: ['total'],
  computed: {
    page() {
      return this.$store.state.page;
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$store.commit('changePage', pageNumber);
    }
  },
}
</script>

<style scoped>

</style>