<template>
  <div class="row">
    <div class="col-md-3 mb-3 mt-1">
      <div class="card">
        <div class="card-body">
          <div class="h2">
            Л.Н Толстой
          </div>
          <div class="h3 text-muted">
            <a href="#">
              Leo
            </a>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="h6 text-muted">
              Подписчиков: 999<br/>
              Подписан: 0
            </div>
          </li>
          <li class="list-group-item">
            <div class="h6 text-muted">
              Записей: 999
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-9">
      <!--      Card-->
      jjj
      <PostCard/>
      <div class="mt-3">
        <!--        Comments-->
      </div>
    </div>

  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
  name: "Post",
  components: {
    PostCard
  }
}
</script>

<style scoped>

</style>