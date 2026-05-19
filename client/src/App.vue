<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/common/NavBar.vue";
// import Footer from "@/components/common/Footer.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    // Footer,
  }
}
</script>
