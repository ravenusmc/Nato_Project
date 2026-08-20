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
  methods: {
    buildPopulationEconomyGraph() {

      const margin = { top: 50, right: 30, bottom: 50, left: 70 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.PopulationEconomySize)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
          // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(this.EconomyMilitarySize.map((d) => d[0]))
        .padding(0.2);

    }
  },
  mounted() {
    this.buildPopulationEconomyGraph();
  },
}

</script>

<style scoped>
</style>