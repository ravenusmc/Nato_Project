<template>
  <div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="state">Please Select State: </label>
          <select v-model="selectedState">
            <option v-for="state in economyGraphStates" :key="state" >
              {{ state }}
            </option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div ref="StateEconomyByYearGraph"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EconomyByYear",
  data() {
    return {
      selectedState: "Belgium",
    };
  },
  computed: {
    ...mapGetters("datapage", ["initialState", "economyGraphStates", "stateEconomicDataByYear"]),
  },
  watch: {
    selectedState(newState) {
      console.log("Selected state changed:", newState);

      this.getStateEconomyGraphData({
        state: newState
      });
    },
    stateEconomicDataByYear(newVal) {
      if (newVal && newVal.length) {
        this.buildEconomyByYearGraph();
      }
    }
  },
  methods: {
    ...mapActions("datapage", ["getStateEconomyGraphData"]),
    handleSubmit() {
      const payload = { state: this.selectedState };
      this.getStateEconomyGraphData(payload);
    },
    buildEconomyByYearGraph() {
      //No data here
      console.log(this.stateEconomicDataByYear)
      // Remove old SVG
      d3.select(this.$refs.StateEconomyByYearGraph).selectAll("*").remove();
      
      // Widened chart and increased bottom margin so rotated x-axis labels have room to breathe
      const margin = { top: 50, right: 30, bottom: 70, left: 70 };
      const width = 700 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(this.$refs.StateEconomyByYearGraph)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      console.log(this.stateEconomicDataByYear)
      
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(this.stateEconomicDataByYear.map((d) => d[0]))
        .padding(0.3); // more padding between bands so adjacent labels don't touch
      
      // Draw the x-axis, then rotate its labels 45 degrees so long state names don't overlap
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(45)")
        .attr("text-anchor", "start")
        .attr("dx", "0.7em") // pushed labels further from their tick marks
        .attr("dy", "0.6em")
        .style("font-size", "11px"); // slightly smaller text to reduce crowding
      
      // Y axis
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(this.stateEconomicDataByYear, (d) => d[1])])
        .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

      // Tooltip
      const tooltip = d3
        .select(this.$refs.StateEconomyByYearGraph)
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
          .html(`Year: ${d[0]}<br>GDP (in billions): ${d[1]}`)
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
        .datum(this.stateEconomicDataByYear)
        .attr("fill", "none")
        .attr("stroke", "#003B75")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Points
      svg
        .selectAll("circle")
        .data(this.stateEconomicDataByYear)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d[0]) + x.bandwidth() / 2)
        .attr("cy", height)
        .attr("r", 6)
        .attr("fill", "#003B75")
        // .on("click", (event, d) => this.handleBarClick(d, event))
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
        .text("Year");
    },
    
  },
  mounted() {
    this.getStateEconomyGraphData({ state: this.selectedState })
    this.buildEconomyByYearGraph();
  },
}
</script>
