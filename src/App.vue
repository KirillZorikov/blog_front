<template>
  <Header/>
  <main>
    <div class="container mt-4">
      <router-view/>
    </div>
  </main>
  <Footer/>
</template>

<style>
@import "assets/bootstrap/dist/css/bootstrap.min.css";
@import "assets/posts/style.css";
@import "assets/fontawesome/css/fontawesome.css";
@import "assets/bootstrap/dist/css/bootstrap-select.css";
</style>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "@/views/Home";

export default {
  components: {Home, Header, Footer}
}
</script>