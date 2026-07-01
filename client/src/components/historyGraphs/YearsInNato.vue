<template>
  <div>
    <div ref="yearsInNatoGraph"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "YearsInNato",
  computed: {
    ...mapGetters("datapage", ["yearsInNatoData"]),
  },
  methods: {
    buildYearsInNatoGraph() {
      
      const margin = { top: 50, right: 30, bottom: 50, left: 70 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.yearsInNatoGraph)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(this.yearsInNatoData.map((d) => d[0]))
        .padding(0.2);
        svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
      
      // Y axis
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(this.yearsInNatoData, (d) => d[1])])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));
      
      // Tooltip
      const tooltip = d3
        .select(this.$refs.yearsInNatoGraph)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "5px");

      const showTooltip = (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`Decade: ${d[0]}<br>Count: ${d[1]}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      };
      const moveTooltip = (event) => {
        tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY - 10 + "px");
      };
      const hideTooltip = () => {
        tooltip.style("opacity", 0);
      };


    }
  },
  mounted() {
    this.buildYearsInNatoGraph();
  },
}

</script>

<stlye scoped>

</stlye>