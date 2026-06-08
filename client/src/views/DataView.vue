<template>
  <div>
    <div class="header-area">
      <h3>The Data</h3>
    </div>
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
    <div class="world-map-area">

    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      year: '',
    }
  },
  methods: {
    ...mapActions("datapage", ["grabMapData"]),
    handleSubmit() {
      const payload = { year: this.year };
      console.log(this.year)
      this.grabMapData(payload);
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