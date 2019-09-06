<template>
  <v-layout row align-center justify-center>
    <v-flex xs12 class="demo-ag-grid">

    </v-flex>
  </v-layout>
</template>

<script>


export default {
  name: "DemoGrid",
  components: {
    AgGrid
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      columnDefs
    }
  }
}
</script>

<style lang="scss">
@import "./commonVariables";

.demo-ag-grid {

}
</style>
