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