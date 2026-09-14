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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EconomyByYear",
  data: {
    selectedState: "Belgium", 
  },
  computed: {
    ...mapGetters("datapage", ["initialState", "NATO_States", "stateEconomicDataByYear"]),
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
    },
  }
  // Using a watcher example: https://github.com/ravenusmc/Social_Media_Mental_Health/blob/main/client/src/components/graphs/DetoxVsStress.vue
}
</script>
