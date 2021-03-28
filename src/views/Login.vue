<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="../assets/imgs/rocket.png" alt=""/>
        <h3>Добро пожаловать!</h3>
        <p>Войдите в свой аккаунт и вы
          сможете оставлять записи в этом замечательном блоге!</p>

        <a href="signup">
          <input type="submit" name="" value="Регистрация"/> <br/>
        </a>
      </div>
      <div class="col-md-9 register-right">
        <div class="tab-content">
          <div class="tab-pane fade show active"
               role="tabpanel" aria-labelledby="home-tab">
            <h3 class="register-heading">Авторизация</h3>
            <form class="row register-form" @submit.prevent="handleLogin">
              <!--              {% csrf_token %}-->
              <!--              {% for field, errors in form.errors.items %}-->
              <!--              {% for error in errors %}-->
              <!--              <div class="alert alert-danger mb-2 w-100"-->
              <!--                   role="alert">-->
              <!--                {{ field }}:-->
              <!--                {{ error }}-->
              <!--                <button type="button" class="close"-->
              <!--                        data-dismiss="alert" aria-label="Close">-->
              <!--                  <span aria-hidden="true">&times;</span>-->
              <!--                </button>-->
              <!--              </div>-->
              <!--              {% endfor %}-->
              <!--              {% endfor %}-->
              <div class="form-group input-group">
                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-user fa-fw"></i>
                                </span>
                </div>
                <input
                    required
                    v-model="user.username"
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="Имя пользователя или E-mail"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock fa-fw"></i>
                                </span>
                </div>
                <input
                    required
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Пароль"
                />
              </div>
              <div class="form-group mt-3">
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Войти</span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
              </div>
              <a href="#"
                 class="btn btn-link d-flex align-items-end mb-2">
                Забыли пароль?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: "Login",
  data() {
    return {
      user: new User(),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      console.log(this.user);
      if (this.user.username && this.user.password) {
        this.loading = true;
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/');
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