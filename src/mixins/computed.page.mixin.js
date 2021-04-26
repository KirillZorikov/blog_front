export default {
    computed: {
        pageStateOptions() {
            return {
                page: this.page
            };
        },
        queryParams() {
            return {
                page: this.$route.query.page
            };
        },
        page() {
            return this.$store.state.page;
        },
        posts() {
            return this.$store.state.posts;
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
}