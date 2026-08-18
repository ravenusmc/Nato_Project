<template>
  <div>
    <div ref="PopulationEconomySize"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "PopulationEconomySize",
  computed: {
    ...mapGetters("datapage", ["populationVsEconomySizeData"]),
  },
}

</script>

<style scoped>
</style>