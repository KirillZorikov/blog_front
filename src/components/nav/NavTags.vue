<template>
  <div class="card tags">
    <div class="card-body">
      <h4 class="card-title">Теги</h4>
      <div class="tagcloud05">
        <ul>
          <li v-for="tag in listTags" :key="tag">
            <a href="#">
              <span>{{ tag.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service';
export default {
  name: "NavTags",
  data() {
    return {
      listTags: [],
    }
  },
  created() {
    this.loadListTags()
  },
  methods: {
    loadListTags() {
      UserService.getListTags().then(
          response => {
            this.listTags = response.data;
          },
      );
    }
  }
}
</script>

<style scoped>

</style>