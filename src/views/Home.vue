<template>


  <h1 class="text-right">Header</h1>
  <!--            <div class="row mt-1 mb-1">-->
  <!--                {% if messages %}-->
  <!--                    {% for message in messages %}-->
  <!--                        <div class="alert alert-success m-auto" role="alert">-->
  <!--                            {{ message }}-->
  <!--                            <button type="button" class="close ml-3" data-dismiss="alert" aria-label="Close">-->
  <!--                                <span aria-hidden="true">&times;</span>-->
  <!--                            </button>-->
  <!--                        </div>-->
  <!--                    {% endfor %}-->
  <!--                {% endif %}-->
  <!--            </div>-->
  <div class="row mt-1">
    <div class="col-lg-3">
      <SideBar/>
    </div>
    <div class="col-lg-9">



      <div v-for="post in listPosts.response" :key="post.id">
        <PostCard v-bind:post="post"/>
<!--        {{ post.text }}-->
<!--        <hr>-->
      </div>

    </div>
  </div>
</template>

<script>

import SideBar from "@/components/SideBar";
import PostCard from "@/components/PostCard";

export default {
  name: 'Home',
  data() {
    return {
      listPosts: []
    }
  },
  components: {
    PostCard,
    SideBar
  },
  created () {
    this.loadListPosts()
  },
  methods: {
    async loadListPosts() {
      this.listPosts = await fetch(
          `${this.$store.getters.getServerUrl}/posts/`
      ).then(response => response.json())
      console.log(this.listPosts.response)
    }
  }
}
</script>
