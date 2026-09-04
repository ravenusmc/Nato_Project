<template>
  <div class="main-div-landing">
    <Top/>
    <Middle />
    <Bottom />
  </div>
</template>

<script>
// @ is an alias to /src
import Top from '@/components/landing/Top.vue'
import Middle from '@/components/landing/Middle.vue'
import Bottom from '@/components/landing/Bottom.vue'
import { mapActions } from "vuex";

export default {
  name: 'HomeView',
  components: {
    Top,
    Middle, 
    Bottom, 
  },
   mounted() {
    this.setUpDataForGraphs();
  },  
  methods: {
    ...mapActions("datapage", ["getDataForGraphs"]),
    setUpDataForGraphs() {
      this.getDataForGraphs();
    }
  },

  //Reference site: https://github.com/ravenusmc/Everest_Study/blob/main/client/src/views/HomeView.vue 
}
</script>

<style scoped>

.main-div-landing {
  background-color: #003B75;
}

</style>
