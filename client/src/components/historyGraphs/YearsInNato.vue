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

      // Line connecting points
      const line = d3
        .line()
        .x((d) => x(d[0]) + x.bandwidth() / 2)
        .y((d) => y(d[1]));

      svg
        .append("path")
        .datum(this.yearsInNatoData)
        .attr("fill", "none")
        .attr("stroke", "#003B75")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Points
      svg
        .selectAll("circle")
        .data(this.yearsInNatoData)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d[0]) + x.bandwidth() / 2)
        .attr("cy", height)
        .attr("r", 6)
        .attr("fill", "#003B75")
        .on("click", (event, d) => this.handleBarClick(d, event))
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .transition()
        .duration(1500)
        .attr("cy", (d) => y(d[1]));
      
      // Labels
      // X-axis
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Number of Years");
      
      // Y-Axis 
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Count");
      
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2 + 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Years in NATO");


    }
  },
  mounted() {
    this.buildYearsInNatoGraph();
  },
}

</script>

<stlye scoped>

</stlye>