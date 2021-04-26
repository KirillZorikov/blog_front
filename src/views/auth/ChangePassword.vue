<template>
  <div class="row w-100 justify-content-center">
    <div class="col-md-8 p-5">
      <div class="card">
        <div class="card-header">Изменить пароль</div>
        <div class="card-body">
          <form @submit.prevent="handleChangePassword">
            <div class="form-group input-group">
              <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock fa-fw"></i>
                                </span>
              </div>
              <input
                  v-model="oldPassword"
                  type="password"
                  class="form-control"
                  name="username"
                  placeholder="Ваш старый пароль"
              />
            </div>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock fa-fw"></i>
                                </span>
              </div>
              <input
                  v-model="user.password"
                  type="password"
                  class="form-control"
                  name="username"
                  placeholder="Новый пароль"
              />
            </div>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock fa-fw"></i>
                                </span>
              </div>
              <input
                  v-model="user.password2"
                  type="password"
                  class="form-control"
                  name="username"
                  placeholder="Новый пароль ещё раз"
              />
            </div>
            <div class="form-group mt-3">
              <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Изменить пароль</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "ChangePassword",
  title: 'Смена пароля',
  data() {
    return {
      user: new User(),
      loading: false,
      oldPassword: '',
      message: ''
    };
  },
  methods: {
    handleChangePassword() {
      console.log(this.user);
      this.user.oldPassword = this.oldPassword
      if (this.user.password2 && this.user.password && this.user.oldPassword) {
        this.loading = true;
        this.$store.dispatch('auth/changePassword', this.user).then(
            () => {
              this.$router.push({name: 'Home', params:{message: 'Пароль изменён!'}});
            },
            error => {
              this.loading = false;
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
      }
    }
  }
}
</script>

<style scoped>

</style>