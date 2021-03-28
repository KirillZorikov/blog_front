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
      <template v-if="errorMessage">
        {{ message }}
      </template>
      <template v-else>
        <div v-for="post in listPosts.response" :key="post.id">
          <PostCard :post="post" :show_all_text="false"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import SideBar from "@/components/SideBar";
import PostCard from "@/components/PostCard";
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      listPosts: [],
      errorMessage: ''
    }
  },
  components: {
    PostCard,
    SideBar
  },
  created() {
    this.loadListPosts()
  },
  methods: {
    loadListPosts() {
      UserService.getListPosts().then(
          response => {
            this.listPosts = response.data;
          },
          error => {
            this.errorMessage =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      );
    }
  }
}
</script>
