<template>
  <div class="col-lg-3 mt-5" :="{hidden: !show}">
    <div class="sticky-top" style="top: 20px">
      <NavGroups :slug="slug"/>
      <NavTags/>
    </div>
  </div>
</template>

<script>
import NavTags from "./nav/NavTags";
import NavGroups from "./nav/NavGroups";

const showFor = ['Group', 'Home']

export default {
  name: "SideBar",
  props: ['slug'],
  components: {NavGroups, NavTags},
  computed: {
    show() {
      return showFor.includes(this.$route.name)
    }
  }
}
</script>