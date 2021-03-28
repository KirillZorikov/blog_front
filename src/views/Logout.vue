<template>
  <div class="row justify-content-center">
    <div class="col-md-8 p-5">
      <div class="card">
        <div class="card-header">Вы вышли из системы</div>
        <div class="card-body">
          <p>{{ message }}</p>
        </div> <!-- card body -->
      </div> <!-- card -->
    </div> <!-- col -->
  </div> <!-- row -->
</template>

<script>
import User from '../models/user';

export default {
  name: "Logout",
  data() {
    return {
      user: new User('', ''),
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/login');
    } else {
      this.handleLogout()
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout').then(
          () => {
            this.message = "Вы вышли из своей учётной записи. Ждём вас снова!"
          },
          error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
      )
    }
  }
}
</script>

<style scoped>

</style>