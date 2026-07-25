<template>
  <div>
    <div ref="economies"></div>
    test
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "EconomiesBarChart",
  computed: {
    ...mapGetters("datapage", ["NatoCountriesEconomies"]),
  },
  methods: {
    buildEconomiesChart() {
      const margin = { top: 50, right: 30, bottom: 50, left: 70 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.economies)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(this.NatoCountriesEconomies.map((d) => d[0]))
        .padding(0.2);
        svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
      
      // Y axis
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(this.NatoCountriesEconomies, (d) => d[1])])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));
    }
  },
  mounted() {
    this.buildEconomiesChart();
  },
}

</script>

<style scoped>
</style>