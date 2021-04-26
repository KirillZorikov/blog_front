<template>
  <footer class="footer mt-auto text-light">
      <p class="m-0 text-center text-light">
          <router-link :to="{name: 'About'}" class="text-light">Об авторе</router-link>
          -
          <router-link :to="{name: 'Tech'}" class="text-light">Технологии</router-link>
      </p>
      <p class="m-0 text-center ">
          <span style="color:red">Ya</span>tube
      </p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>