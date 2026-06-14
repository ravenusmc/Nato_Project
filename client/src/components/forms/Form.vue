<template>
  <div>
    <div class="form-area">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="year">Year:</label>
          <input 
            id="username" 
            type="number" 
            v-model="year" 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Form",
  watch: {
    NATO_States: {
      handler: "buildCauseOfDeathGraph",
      deep: true,
    },
  },
  // computed: {
  //   ...mapGetters("datapage", ["initialMapYear"]),
  // },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    handleSubmit() {
      const payload = { year: this.year };
      this.grabMapData(payload);
    },
  }
}

</script>