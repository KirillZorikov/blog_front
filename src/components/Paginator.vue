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
  data() {
    return {
      currentPage: this.page
    }
  },
  computed: {
    page() {
      return this.$store.state.page;
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
      this.$store.commit('changePage', pageNumber);
    }
  },
  watch: {
    page() {
      if (this.currentPage !== this.page) { // if page changed not from Paginator
        this.changePage(this.page)
      }
    }
  }
}
</script>

<style scoped>

</style>