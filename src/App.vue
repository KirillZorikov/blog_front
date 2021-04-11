<template>
  <Header/>
  <main>
    <div class="container mt-3">
      <div class="row">
        <SideBar />
        <router-view/>
      </div>
    </div>
  </main>
  <Footer/>
</template>

<style>
@import "assets/bootstrap.min.css";
@import "assets/posts/style.css";
@import "assets/fontawesome.css";
@import "assets/bootstrap-select.css";
</style>
<script>

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import SideBar from "./components/SideBar";

export default {
  components: {SideBar, Home, Header, Footer},

}
</script>