<template>
  <div>
    <h3 class="title-area">NATO Membership & History</h3>
    <div class="history-graph-area">
      <JoinGraph/>
      <FoundingMemberChart/>
      <YearsInNato />
    </div>
  </div>
</template>

<script>
import JoinGraph from '@/components/historyGraphs/JoinGraph.vue';
import FoundingMemberChart from '@/components/historyGraphs/FoundingMemberChart.vue';
import YearsInNato from '@/components/historyGraphs/YearsInNato.vue';

export default {
  name: "History",
  components: {
    JoinGraph,
    FoundingMemberChart, 
    YearsInNato, 
  },
}

</script>

<style scope>

.history-graph-area {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.title-area {
  text-align: center;
  text-transform: uppercase;
}

</style>