<template>
  <div>
    <div ref="FoundingMemberPieChart"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "FoundingMemberPieChart",
  computed: {
    ...mapGetters("datapage", ["foundingMemberPieChart"]),
  },
  methods: {
    buildFoundingMemberPieChart() {
      const raw = this.foundingMemberPieChart[0];
      const data = [
        { label: "Founding Members", value: raw[0] },
        { label: "Non-Founding Members", value: raw[1] },
      ];

      const width = 460;
      const height = 400;
      const radius = Math.min(width, height) / 2 - 40;

      const svg = d3
        .select(this.$refs.FoundingMemberPieChart)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.label))
        .range(["#003B75", "#A8C8E8"]);

      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      const arcHover = d3.arc().innerRadius(0).outerRadius(radius + 8);

      const tooltip = d3
        .select(this.$refs.FoundingMemberPieChart)
        .append("div")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "5px")
        .style("pointer-events", "none");

      svg
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.label))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", function (_event, d) {
          d3.select(this).transition().duration(200).attr("d", arcHover);
          tooltip
            .style("opacity", 1)
            .html(`<strong>${d.data.label}</strong><br>Count: ${d.data.value}`);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", event.pageX + 12 + "px")
            .style("top", event.pageY - 12 + "px");
        })
        .on("mouseleave", function () {
          d3.select(this).transition().duration(200).attr("d", arc);
          tooltip.style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return (t) => arc(interpolate(t));
        });

      // Labels
      svg
        .selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-size", "14px")
        .style("fill", "white")
        .style("font-weight", "bold")
        .text((d) => d.data.value);

      // Legend
      const legend = d3
        .select(this.$refs.FoundingMemberPieChart)
        .select("svg")
        .append("g")
        .attr("transform", `translate(${width - 170}, 20)`);

      data.forEach((d, i) => {
        const row = legend.append("g").attr("transform", `translate(0, ${i * 24})`);
        row.append("rect").attr("width", 16).attr("height", 16).attr("fill", color(d.label));
        row
          .append("text")
          .attr("x", 22)
          .attr("y", 12)
          .style("font-size", "13px")
          .text(d.label);
      });
    },
  },
  mounted() {
    this.buildFoundingMemberPieChart();
  },
};
</script>

<style scoped>
</style>
