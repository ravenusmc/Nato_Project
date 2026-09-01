<template>
  <div>
    <div class="header-area">
      <h3>The Data</h3>
    </div>
    <!-- This area is for the global map of NATO states-->
    <Form />
    <Map />
    <!-- This area is for the NATO Membership and History graphs -->
     <History />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Form from '@/components/forms/Form.vue'
import Map from '@/components/maps/Map.vue'
import History from '@/components/dataSections/History.vue'

export default {
  components: {
    Form,
    Map,
    History, 

  },
  data() {
    return {
      year: '',
    }
  },
  computed: {
    ...mapGetters("datapage", ["initialMapYear", "NATO_States"]),
  },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    handleSubmit() {
      const payload = { year: this.year };
      this.grabMapData(payload);
    },
    buildWorldMap() {
    }  
  }
}
</script>

<style scoped>

.header-area {
  display: grid;
  place-items: center;
  margin-top: 4%;
}

h3 {
  text-transform: uppercase;
  justify-content: center;
  font-size: 2rem;
}

</style>