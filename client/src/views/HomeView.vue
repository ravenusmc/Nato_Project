<template>
  <div>
    <Top/>
    <Middle />
  </div>
</template>

<script>
// @ is an alias to /src
import Top from '@/components/landing/Top.vue'
import Middle from '@/components/landing/Middle.vue'

export default {
  name: 'HomeView',
  components: {
    Top,
    Middle, 
  }
}
</script>

<style scoped>



</style>
