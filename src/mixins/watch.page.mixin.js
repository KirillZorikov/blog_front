export default {
    watch: {
        pageStateOptions(value) {
            if (value.page === 1) {
                this.$router.push(`${window.location.pathname}`);
            } else {
                this.$router.push(`${window.location.pathname}?page=${value.page}`);
            }
        },
        page() {
            this.loadData()
        },
        $route() {
            if (this.$route.name !== this.$options.name) {
                this.$store.commit('changePage', 1);
            }
        },
        queryParams(to) {
            if (this.$route.name !== this.$options.name) {
                return
            }
            this.$store.commit('changePage', to.page ? parseInt(to.page) : 1)
        }
    }
}