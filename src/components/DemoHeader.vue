<template>
  <v-layout row align-center justify-start class="demo-header">
    <v-flex shrink>
      <img :src="logo" alt="logo" class="logo-wrapper">
    </v-flex>
    <v-flex shrink>
      <v-layout column>
        <v-flex xs6 class="title-text">
          <span>Zeo Research</span>
        </v-flex>
        <v-flex xs6 class="title-text">
          <span>For Armut.com</span>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "DemoHeader",
    data() {
      return {
        logo: require('../assets/armut_logo.jpg')
      }
    }
  }
</script>

<style lang="scss">
@import "../components/commonVariables";
.demo-header {
  .logo-wrapper {
    width: 50px;
  }
  .title-text {
    @include display-flex-creator(center, flex-start);
  }
}
</style>
