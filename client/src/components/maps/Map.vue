<template>
  <div>
    <div ref="NATO-map">

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Map",
  watch: {
    NATO_States: {
      handler: "buildCauseOfDeathGraph",
      deep: true,
    },
  },
  mounted() {
    this.buildCauseOfDeathGraph();
  },
  computed: {
    ...mapGetters("datapage", ["initialMapYear", "NATO_States"]),
  },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    buildWorldMap() {

    }  
  }
}

</script>

<style scoped>

</style>