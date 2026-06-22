<template>
  <div>
    <h3 class="title-area">NATO Membership & History</h3>
    <JoinGraph/>
    <FoundingMemberChart/>
  </div>
</template>

<script>
import JoinGraph from '@/components/historyGraphs/JoinGraph.vue';
import FoundingMemberChart from '@/components/historyGraphs/FoundingMemberChart.vue';

export default {
  name: "History",
  components: {
    JoinGraph,
    FoundingMemberChart, 
  },
}

</script>

<style scope>

.title-area {
  text-align: center;
  text-transform: uppercase;
}

</style>