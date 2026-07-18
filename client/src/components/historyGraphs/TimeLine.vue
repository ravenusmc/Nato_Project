<template>
  <div>
      <div ref="TimeLine"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "TimeLine",
  computed: {
    ...mapGetters("datapage", ["NatoTimeLineData"]),
  },
  methods: {
    buildTimeLine() {

      // Sort a copy of the data by join year so the timeline reads top-to-bottom
      // in the order countries actually joined NATO.
      const data = [...this.NatoTimeLineData].sort((a, b) => a["Join Year"] - b["Join Year"]);

      // The left margin needs to be wide enough to fit the longest country name,
      // and the height needs to grow with the number of countries so every row
      // gets its own band instead of being squeezed together.
      const margin = { top: 50, right: 40, bottom: 50, left: 150 };
      const width = 700 - margin.left - margin.right;
      const height = data.length * 22 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.TimeLine)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X axis: a linear scale of years running from the founding year to 2026,
      // used to place each country's dot at the point in time it joined.
      const x = d3
        .scaleLinear()
        .domain([1949, 2026])
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        // "d" format avoids d3 turning years like 1949 into "1,949"
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Y axis: one band per country, in join order.
      const y = d3
        .scaleBand()
        .range([0, height])
        .domain(data.map((d) => d["Country"]))
        .padding(0.3);
      svg.append("g").call(d3.axisLeft(y));

      // Tooltip
      const tooltip = d3
        .select(this.$refs.TimeLine)
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
          .html(`${d["Country"]}<br>Joined: ${d["Join Year"]}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      };
      const moveTooltip = (event) => {
        tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY - 10 + "px");
      };
      const hideTooltip = () => {
        tooltip.style("opacity", 0);
      };

      // Stems: a thin line from the start of the axis out to each country's
      // join-year dot, so every row reads like an entry on a timeline.
      svg
        .selectAll(".stem")
        .data(data)
        .enter()
        .append("line")
        .attr("class", "stem")
        .attr("x1", x(1949))
        .attr("x2", x(1949))
        .attr("y1", (d) => y(d["Country"]) + y.bandwidth() / 2)
        .attr("y2", (d) => y(d["Country"]) + y.bandwidth() / 2)
        .attr("stroke", "#ccc")
        .attr("stroke-width", 1)
        .transition()
        .duration(1500)
        .attr("x2", (d) => x(d["Join Year"]));

      // Dots: founding members (1949) get a different color than states that
      // joined later, so the original 12 stand out at a glance.
      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", x(1949))
        .attr("cy", (d) => y(d["Country"]) + y.bandwidth() / 2)
        .attr("r", 6)
        .attr("fill", (d) => (d["Join Year"] === 1949 ? "#B22234" : "#003B75"))
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .transition()
        .duration(1500)
        .attr("cx", (d) => x(d["Join Year"]));

      // Labels
      // X-axis
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Year Joined");

      // Y-Axis
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Country");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2 + 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("NATO Membership Timeline (1949-2026)");
    }
  },
  mounted() {
    this.buildTimeLine();
  },
}

</script>

 <style scoped>

</style>