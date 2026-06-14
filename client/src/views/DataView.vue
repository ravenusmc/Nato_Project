<template>
  <div>
    <div class="header-area">
      <h3>The Data</h3>
    </div>
    <Form />
    <Map />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Form from '@/components/forms/Form.vue'
import Map from '@/components/maps/Map.vue'

export default {
  components: {
    Form,
    Map
  },
  data() {
    return {
      year: '',
    }
  },
  watch: {
    NATO_States: {
      handler: "buildCauseOfDeathGraph",
      deep: true,
    },
  },
  mounted() {
    this.buildCauseOfDeathGraph();
  },
  computed: {
    ...mapGetters("datapage", ["initialMapYear", "NATO_States"]),
  },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    handleSubmit() {
      const payload = { year: this.year };
      console.log(this.year)
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