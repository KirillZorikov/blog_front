<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="../assets/imgs/rocket.png" alt=""/>
        <h3>Добро пожаловать!</h3>
        <p>Потратив всего 30 секунд на регистрацию,
          вы сможете оставлять записи в этом замечательном блоге!</p>
        <router-link to="/login">
          <input type="submit" name="" value="Войти"/> <br/>
        </router-link>
      </div>
      <div class="col-md-9 register-right">
        <div class="tab-content">
          <div class="tab-pane fade show active"
               role="tabpanel" aria-labelledby="home-tab">
            <h3 class="register-heading">
              Регистрация
            </h3>
            <form class="row register-form" @submit.prevent="handleRegister">
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
                                    <i class="fa fa-id-badge fa-fw"></i>
                                </span>
                </div>
                <input
                    v-model="user.first_name"
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="Ваше имя"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-id-badge fa-fw"></i>
                                </span>
                </div>
                <input
                    v-model="user.last_name"
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="Фамилия"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-user fa-fw"></i>
                                </span>
                </div>
                <input
                    v-model="user.username"
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="Имя пользователя"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-envelope fa-fw"></i>
                                </span>
                </div>
                <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    name="username"
                    placeholder="Почтовый адрес"
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
                    placeholder="Пароль"
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
                    placeholder="Повторите пароль"
                />
              </div>

              <!--          <div class="alert alert-danger mb-2" role="alert">-->
              <!--            {{ message }}-->
              <!--            <button type="button" class="close ml-3"-->
              <!--                    data-dismiss="alert" aria-label="Close">-->
              <!--              <span aria-hidden="true">&times;</span>-->
              <!--            </button>-->
              <!--          </div>-->
              <!--          <script src='https://www.google.com/recaptcha/api.js'></script>-->
              <!--          <div class="form-group g-recaptcha input-group"-->
              <!--               data-sitekey="6LdB0Q0aAAAAADNyqvkOzqNuhJnHglBjzY-LVzqn"></div>-->
              <div class="form-group mt-3">
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Зарегистрироваться</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import User from "@/models/user";

export default {
  name: "Register",
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
    handleRegister() {
      this.loading = true;
      this.$store.dispatch('auth/register', this.user).then(
          () => {
            this.$router.push('/login');
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
</script>

<style scoped>

</style>