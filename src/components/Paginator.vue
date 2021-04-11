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
        <li class="page-item" :class="{'active': pageNumber === currentPage}">
          <span v-if="pageNumber === currentPage" class="page-link">
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
  props: ['page', 'total'],
  data() {
    return {
      currentPage: this.page ? this.page : 1
    }
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.$emit('page-changed', pageNumber)
    }
  }
}
</script>

<style scoped>

</style>