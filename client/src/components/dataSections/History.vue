<template>
  <div>
    <h3 class="title-area">NATO Membership & History</h3>
    <JoinGraph/>
  </div>
</template>

<script>
import JoinGraph from '@/components/historyGraphs/JoinGraph.vue';

export default {
  name: "History",
  components: {
    JoinGraph,
  },
}

</script>

<style scope>

.title-area {
  text-align: center;
  text-transform: uppercase;
}

</style>