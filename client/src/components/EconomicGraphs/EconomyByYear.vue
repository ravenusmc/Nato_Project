<template>
  <div>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="state">Please Select State: </label>
          <input
            id="state"
            v-model="state"
            :placeholder="initialState"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EconomyByYear",
  computed: {
    ...mapGetters("datapage", ["initialState"]),
  },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    handleSubmit() {
      const payload = { year: this.year };
      this.grabMapData(payload);
    },
  }
}
</script>
