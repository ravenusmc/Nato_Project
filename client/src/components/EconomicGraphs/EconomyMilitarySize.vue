<template>
  <div>
    <div ref="EconomyMilitarySize"></div>
    test
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "EconomyMilitarySize",
  computed: {
    ...mapGetters("datapage", ["EconomyMilitarySize"]),
  },
    methods: {
    buildEconomyMilitarySizeGraph() {
    }
  },
  mounted() {
    this.buildEconomyMilitarySizeGraph();
  },
}

</script>

<style scoped>
</style>