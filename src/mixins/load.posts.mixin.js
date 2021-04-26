import {PostService} from "../services/user.services";

export default {
  methods: {
    loadListPosts() {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.loading = true;
      PostService.getListPosts(this.makeParams()).then(
          response => {
            this.loading = false;
            this.$store.commit('changePosts', response.data.response);
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    }
  }
}