<template>
  <div>
    <Top/>
    <Middle />
    <Bottom />
  </div>
</template>

<script>
// @ is an alias to /src
import Top from '@/components/landing/Top.vue'
import Middle from '@/components/landing/Middle.vue'
import Bottom from '@/components/landing/Bottom.vue'

export default {
  name: 'HomeView',
  components: {
    Top,
    Middle, 
    Bottom, 
  }
}
</script>

<style scoped>



</style>
