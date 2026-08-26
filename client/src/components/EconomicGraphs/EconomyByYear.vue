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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EconomyByYear",
  data: {
    selectedState: "", 
  },
  computed: {
    ...mapGetters("datapage", ["initialState", "NATO_States"]),
  },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    handleSubmit() {
      const payload = { state: this.selectedState };
      // this.grabMapData(payload);
    },
  }
}
</script>
