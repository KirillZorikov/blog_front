<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand mr-5"><span style="color:red">Ya</span>Tube</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0" action="#">
          <input class="form-control mr-1" type="text" placeholder="Поиск по сайту" name="search">
          <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Поиск</button>
        </form>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-5">
            <a class="nav-link" href="#">Добавить запись</a>
          </li>
          <li class="nav-item dropdown">
            <div class="btn-group open">
              <template v-if="currentUser">
                <a class="btn btn-primary"
                   href="#">
                  <i class="fa fa-user fa-fw"></i>
                  {{ currentUser.username }}
                </a>
                <a class="btn btn-primary dropdown-toggle"
                   data-toggle="dropdown">
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link to="/change-password">
                      <i class="fa fa-key fa-fw"></i>
                      Изменить пароль
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/logout">
                      <i class="fa fa fa-sign-out-alt fa-fw"></i>
                      Выйти
                    </router-link>
                  </li>
                </ul>
              </template>
              <template v-else>
                <router-link to="/login" class="btn btn-primary text-light">
                  <i class="fa fa-user fa-fw"></i>
                  Вход
                </router-link>
                <a class="btn btn-primary dropdown-toggle"
                   data-toggle="dropdown">
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link to="/login">
                      <i class="fa fa fa-sign-in-alt fa-fw"></i>
                      Войти
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/register">
                      <i class="fa fa-pencil-alt fa-fw"></i>
                      Регистрация
                    </router-link>
                  </li>
                </ul>
              </template>
              <!--              {% endif %}-->
            </div>
          </li>
        </ul>

      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "Nav",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
}
</script>

<style scoped>

</style>