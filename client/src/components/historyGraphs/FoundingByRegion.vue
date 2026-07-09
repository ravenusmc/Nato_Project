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

      // Overall chart size and the padding reserved on each side for axes/
      // labels. `bottom` is taller than the others because the x-axis labels
      // (region names) are rotated 45° and need vertical room to clear the
      // "Region" axis title underneath them without getting clipped.
      const margin = { top: 50, right: 30, bottom: 110, left: 70 };
      const width = 460 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Root <svg>, sized to include the margins, with an inner <g> shifted
      // right/down by the margin so everything drawn below is positioned
      // relative to the plot area (0,0 = top-left of the chart itself).
      const svg = d3
        .select(this.$refs.FoundingVsNonFoundingByRegion)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Reshape the incoming [name, {a, b}] pairs into flat objects like
      // { region: name, Founding_Member: a, Non_Founding_Member: b }, which
      // is the shape d3.stack() expects to work with.
      const stackKeys = ["Founding_Member", "Non_Founding_Member"];
      const chartData = this.FoundingVsNonFoundingByRegionData.map(([region, counts]) => ({
        region,
        ...counts,
      }));

      // Compute stacked layout: for each region, this piles Founding_Member
      // and Non_Founding_Member on top of one another so the bars can be
      // drawn as stacked segments instead of two separate bars.
      const series = d3.stack().keys(stackKeys)(chartData);

      // Assign a color per category, then tag every stacked segment with
      // its category name (piece.key) so later code (bars, tooltip) knows
      // which series a given rectangle belongs to.
      const color = d3.scaleOrdinal().domain(stackKeys).range(["#003B75", "#8ecae6"]);
      series.forEach((oneSeries) => {
        oneSeries.forEach((piece) => {
          piece.key = oneSeries.key;
        });
      });

      // X axis: one band per region, drawn along the bottom of the chart.
      // Tick labels are rotated 45° and anchored at "start" so long region
      // names read diagonally instead of overlapping each other.
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

      // Y axis: scales from 0 up to the tallest stacked total (the sum of
      // Founding_Member + Non_Founding_Member for whichever region has the
      // most states), since bars are stacked rather than side-by-side.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.Founding_Member + d.Non_Founding_Member)])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Floating tooltip element, hidden by default (opacity 0) and
      // positioned/shown on hover by the handlers below.
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

      // Tooltip handlers: each stacked segment (d) carries its region
      // (d.data.region), its category (d.key), and its own count
      // (d.data[d.key]), so the tooltip can show "Region: X / Category: N".
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

      // Bars: one <g> group per category (Founding vs Non-Founding), each
      // colored via `fill` on the group. Inside each group, one <rect> per
      // region is drawn at its stacked position (d[0] = bottom of this
      // segment, d[1] = top of this segment) so segments stack instead of
      // overlapping. Bars start at height/0 and animate up to full size.
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

      // Axis title labels
      // X-axis title, placed below the rotated tick labels (which occupy the
      // space right under the axis line), near the bottom of the reserved
      // margin.
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Region")

      // Y-axis title, rotated -90° to read vertically alongside the axis,
      // and shifted left into the left margin so it doesn't overlap the
      // tick number labels.
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Count");

      // Chart title, centered above the plot area in the top margin.
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2 + 10)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("States Joining NATO by Region");

      // Legend: a small colored square + label per category (Founding vs
      // Non-Founding Member), stacked vertically in the top-right of the
      // chart, so the bar colors are identifiable at a glance.
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