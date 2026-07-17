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
    
  }
}

</script>

 <style scoped>

</style>