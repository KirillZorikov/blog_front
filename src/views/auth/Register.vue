<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="../../assets/imgs/rocket.png" alt=""/>
        <h3>Добро пожаловать!</h3>
        <p>Потратив всего 30 секунд на регистрацию,
          вы сможете оставлять записи в этом замечательном блоге!</p>
        <router-link :to="{name: 'Login'}">
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
              <div v-if="message.first_name" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['first_name'].join() }}
              </div>
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
                    placeholder="Ваше имя"
                />
              </div>

              <div v-if="message.last_name" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['last_name'].join() }}
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
                    placeholder="Фамилия"
                />
              </div>

              <div v-if="message.username" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['username'].join() }}
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
                    placeholder="Имя пользователя"
                />
              </div>

              <div v-if="message.email" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['email'].join() }}
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
                    placeholder="Почтовый адрес"
                />
              </div>

              <div v-if="message.password" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['password'].join() }}
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
                    placeholder="Пароль"
                />
              </div>

              <div v-if="message.password2" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['password2'].join() }}
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock fa-fw"></i>
                                </span>
                </div>
                <input
                    v-model="password2"
                    type="password"
                    class="form-control"
                    placeholder="Повторите пароль"
                />
              </div>

              <div v-if="message.recaptcha" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message['recaptcha'].join() }}
              </div>
              <div class="form-group g-recaptcha input-group"
                   data-sitekey="6LdB0Q0aAAAAADNyqvkOzqNuhJnHglBjzY-LVzqn"></div>
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
  title: 'Регистрация',
  data() {
    return {
      user: new User(),
      loading: false,
      message: '',
      password2: ''
    };
  },
  mounted() {
    new Promise((resolve, reject) => {
      const $script = document.createElement('script')
      $script.src = 'https://www.google.com/recaptcha/api.js'
      resolve(document.head.appendChild($script));

      setTimeout(() => reject(new Error("Google reCaptcha не инициализирована")), 3000);
    });
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
    handleRegister(submitEvent) {
      let recaptcha = submitEvent.target.elements['g-recaptcha-response'].value
      if (!recaptcha) {
        this.message = {'recaptcha':['Введите капчу!']}
        return
      }
      this.user.recaptcha_key = recaptcha
      this.user.password2 = this.password2
      this.loading = true;
      this.$store.dispatch('auth/register', this.user).then(
          () => {
            this.$store.dispatch('auth/login', this.user).then(
                () => {
                  this.$router.push({name: 'Home', params: {message: 'Вы успешно зарегистрировались!'}});
                },
                error => {
                  this.$router.push('/login');
                }
            )
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