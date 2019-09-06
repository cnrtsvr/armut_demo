<template>
  <v-app>
    <v-content>
      <ArmutDemo/>
    </v-content>
  </v-app>
</template>

<script>
import ArmutDemo from './views/ArmutDemo.vue'

export default {
  name: 'app',
  components: {
    ArmutDemo
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
