export default {
    methods: {
        initUrlParams(page, ordering) {
            if (page && this.$route.query.page) {
                this.$store.commit('changePage', parseInt(this.$route.query.page));
            }
            if (ordering && this.$route.query.ordering) {
                this.$store.commit('changeOrdering', this.$route.query.ordering);
            }
        }
    }
}