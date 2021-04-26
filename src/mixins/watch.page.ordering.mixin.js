export default {
    watch: {
        pageStateOptions(value) {
            let url = '';
            if (this.ordering === '-pub_date') {
                if (this.page !== 1) {
                    url = `${window.location.pathname}?page=${value.page}`;
                }
            } else {
                if (this.page === 1) {
                    url = `${window.location.pathname}?ordering=${value.ordering.toString()}`;
                } else {
                    url = `${window.location.pathname}?ordering=${value.ordering.toString()}&page=${value.page}`;
                }
            }
            this.$router.push(url);
        },
        page() {
            this.loadData()
        },
        ordering() {
            this.loadData();
        },
        $route() {
            if (this.$route.name !== this.$options.name) {
                this.$store.commit('changePage', 1);
                this.$store.commit('changeOrdering', '-pub_date');
            }
        },
        queryParams(to) {
            if (this.$route.name !== this.$options.name) {
                return
            }
            this.$store.commit('changePage', to.page ? parseInt(to.page) : 1)
            this.$store.commit('changeOrdering', to.ordering ? to.ordering : '-pub_date');
        }
    }
}