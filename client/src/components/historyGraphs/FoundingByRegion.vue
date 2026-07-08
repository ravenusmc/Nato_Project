<template>
  <div>
    <div ref="FoundingVsNonFoundingByRegion"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "FoundingByRegion",
  computed: {
    ...mapGetters("datapage", ["FoundingVsNonFoundingByRegionData"]),
  },
  methods: {
    buildFoundingByRegionGraph() {
      
      const margin = { top: 50, right: 30, bottom: 50, left: 70 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.FoundingVsNonFoundingByRegion)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // CHANGE 1: Turn each [name, {a, b}] pair into one easy object like
      // { region: name, Founding_Member: a, Non_Founding_Member: b }.
      // The stacking helper (d3.stack) needs objects like this, not pairs.
      const stackKeys = ["Founding_Member", "Non_Founding_Member"];
      const chartData = this.FoundingVsNonFoundingByRegionData.map(([region, counts]) => ({
        region,
        ...counts,
      }));

      // CHANGE 2: Ask d3 to stack (pile up) the two counts on top of each other
      // for every region, instead of just using one number per region.
      const series = d3.stack().keys(stackKeys)(chartData);

      // CHANGE 3: Give each stacked piece a color, and remember which piece
      // (Founding_Member or Non_Founding_Member) it is so the tooltip can say so.
      const color = d3.scaleOrdinal().domain(stackKeys).range(["#003B75", "#8ecae6"]);
      series.forEach((oneSeries) => {
        oneSeries.forEach((piece) => {
          piece.key = oneSeries.key;
        });
      });

      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(chartData.map((d) => d.region))
        .padding(0.2);
        svg
          .append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "rotate(45)")
          .style("text-anchor", "start");

      // Y axis
      // CHANGE 4: The tallest bar is now the TOTAL of both counts added together,
      // not just one number, since the pieces stack on top of each other.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.Founding_Member + d.Non_Founding_Member)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Tooltip
      const tooltip = d3
        .select(this.$refs.FoundingVsNonFoundingByRegion)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px")
        .style("border-radius", "5px");

      // CHANGE 5: Since each bar piece now knows its region (d.data.region),
      // its category (d.key), and its own count (d.data[d.key]), the tooltip
      // shows those instead of the old "Decade / Count" pair.
      const showTooltip = (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`Region: ${d.data.region}<br>${d.key}: ${d.data[d.key]}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      };
      const moveTooltip = (event) => {
        tooltip.style("left", event.pageX + 10 + "px").style("top", event.pageY - 10 + "px");
      };
      const hideTooltip = () => {
        tooltip.style("opacity", 0);
      };

      // Bars
      // CHANGE 6: First make one <g> group per color (Founding vs Non-Founding),
      // then draw one rect per region inside each group. Each rect sits at its
      // stacked position (d[0] = bottom of this piece, d[1] = top of this piece)
      // instead of always starting at 0, so the pieces stack on top of each other.
      svg
        .append("g")
        .selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .attr("fill", (d) => color(d.key))
        .selectAll("rect")
        .data((d) => d)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.data.region))
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .on("click", (event, d) => this.handleBarClick(d, event))
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .transition()
        .duration(1500)
        .attr("y", (d) => y(d[1]))
        .attr("height", (d) => y(d[0]) - y(d[1]));

      // Labels
      // X-axis
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Region")
        
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
        .text("States Joining NATO by Region");

      // CHANGE 7: Add a small color key so people know which color means
      // Founding Member and which one means Non-Founding Member.
      const legend = svg
        .selectAll(".legend")
        .data(stackKeys)
        .enter()
        .append("g")
        .attr("transform", (_, i) => `translate(${width - 150},${i * 20})`);

      legend
        .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", (d) => color(d));

      legend
        .append("text")
        .attr("x", 18)
        .attr("y", 10)
        .style("font-size", "12px")
        .text((d) => d.replace("_", " "));

    }
  },
  mounted() {
    this.buildFoundingByRegionGraph();
  },
}
</script>

<style scoped> 
</style>