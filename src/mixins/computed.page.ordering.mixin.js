export default {
    computed: {
        pageStateOptions() {
            return {
                ordering: this.ordering,
                page: this.page
            };
        },
        queryParams() {
            return {
                ordering: this.$route.query.ordering,
                page: this.$route.query.page
            };
        },
        page() {
            return this.$store.state.page;
        },
        ordering() {
            return this.$store.state.ordering;
        },
        posts() {
            return this.$store.state.posts;
        },
    },
}