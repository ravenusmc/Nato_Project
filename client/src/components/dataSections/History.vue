<template>
  <div>
    <h3 class="title-area">NATO Membership & History</h3>
    <div class="graph-area">
      <TimeLine />
      <JoinGraph/>
      <FoundingMemberChart/>
      <YearsInNato />
      <FoundingByRegion />
    </div>
    <h3 class="title-area">Economic Strength</h3>
    <div class="graph-area">
      <EconomiesBarChart />
    </div>
  </div>
</template>

<script>
// History Graphs 
import JoinGraph from '@/components/historyGraphs/JoinGraph.vue';
import FoundingMemberChart from '@/components/historyGraphs/FoundingMemberChart.vue';
import YearsInNato from '@/components/historyGraphs/YearsInNato.vue';
import FoundingByRegion from '@/components/historyGraphs/FoundingByRegion.vue';
import TimeLine from '@/components/historyGraphs/TimeLine.vue';
// Economic Graphs 
import EconomiesBarChart from '@/components/EconomicGraphs/Economies.vue';

export default {
  name: "History",
  components: {
    JoinGraph,
    FoundingMemberChart, 
    YearsInNato, 
    FoundingByRegion,
    TimeLine, 
    EconomiesBarChart, 
  },
}

</script>

<style scope>

.graph-area {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.title-area {
  text-align: center;
  text-transform: uppercase;
}

</style>