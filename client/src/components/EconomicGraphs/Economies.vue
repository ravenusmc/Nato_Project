<template>
  <div>
    <div ref="economies"></div>
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
    }
  }
}

</script>

<style scoped>
</style>