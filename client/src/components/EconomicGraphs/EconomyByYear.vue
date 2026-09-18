<template>
  <div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="state">Please Select State: </label>
          <select v-model="selectedState">
            <option v-for="state in NATO_States" :key="state" >
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
  data: {
    selectedState: "Belgium", 
  },
  computed: {
    ...mapGetters("datapage", ["initialState", "NATO_States", "stateEconomicDataByYear"]),
  },
  watch: {
    stateEconomicDataByYear(newVal) {
      if (newVal.length) {
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
        .select(this.$refs.EconomyMilitarySize)
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
          .html(`Country: ${d[2]}<br> GDP (in billions): ${d[0]}<br>Defense Budget (in billions): ${d[1]}`)
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

    },
    
  },
  mounted() {
    this.buildEconomyByYearGraph();
  },
  // Using a watcher example: https://github.com/ravenusmc/Social_Media_Mental_Health/blob/main/client/src/components/graphs/DetoxVsStress.vue
}
</script>
