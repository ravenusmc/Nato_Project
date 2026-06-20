<template>
  <div>
    <div class="form-area">
      <form class="year-form" @submit.prevent="handleSubmit">
        <div class="field">
          <label for="year">Please Enter Year</label>
          <input
            id="year"
            type="number"
            v-model="year"
            :placeholder="initialMapYear"
            min="1949"
            max="2020"
          />
          <span class="field-hint">1949 &ndash; 2020</span>
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
  // watch: {
  //   NATO_States: {
  //     handler: "buildCauseOfDeathGraph",
  //     deep: true,
  //   },
  // },
  computed: {
    ...mapGetters("datapage", ["initialMapYear"]),
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

<style scoped>
.form-area {
  display: grid;
  place-items: center;
  padding: 2% 4% 1%;
}

.year-form {
  display: flex;
  align-items: flex-end;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
  background: rgba(8, 8, 8, 0.92);
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 8px;
  padding: 1.5rem 2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #c9a84c;
}

.field input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.55rem 0.75rem;
  width: 160px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field input:focus {
  outline: none;
  border-color: #c9a84c;
  box-shadow: 0 0 10px rgba(201, 168, 76, 0.25);
}

.field input::placeholder {
  color: #777;
}

.field-hint {
  font-size: 0.65rem;
  letter-spacing: 1px;
  color: #888;
}

.year-form button {
  background: transparent;
  border: 1.5px solid #c9a84c;
  border-radius: 4px;
  color: #c9a84c;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, box-shadow 0.2s;
}

.year-form button:hover {
  color: #08080a;
  background: #c9a84c;
  box-shadow: 0 0 12px rgba(201, 168, 76, 0.35);
}

@media (max-width: 480px) {
  .year-form {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .field input {
    width: 100%;
  }
}
</style>