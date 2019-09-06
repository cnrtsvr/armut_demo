<template>
  <v-container grid-list-md id="armut-demo-wrapper">
    <DemoHeader/>
    <DemoInputs @inputs-changed="inputsChanged" @search-clicked="searchClicked"/>
    <v-layout row>
      <v-flex xs12>
        <AgGrid :footer-info-enabled="false" :column-defs="columnDefs" :loading="dataLoading"
                :table-data="tableData" :row-model-type="'clientSide'"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DemoHeader from "../components/DemoHeader.vue";
import DemoInputs from "../components/DemoInputs.vue";
import AgGrid from "../components/AgGrid.vue";
import columnDefs from "../components/js/columnDefs.js";

export default {
  name: "ArmutDemo",
  components: {
    DemoHeader,
    DemoInputs,
    AgGrid
  },
  data() {
    return {
      columnDefs,
      tableData: [],
      inputs: null,
      dataLoading: false
    };
  },
  methods: {
    sendRequest() {
      const testData = {
        query : "metehan",
        lang: "tr",
        country: "tr",
        expression:[0, 100000],
        operator: "between",
        exactSearch: 1,
        columns: ["keyword","categories"]
      };
      this.dataLoading = true;
      this.$api.post('/get_data', {
        ...this.inputs,
        page: 1
      }).then(response => {
        this.tableData = [...response.data];
        this.dataLoading = false;
      })
    },
    searchClicked() {
      this.sendRequest();
    },
    inputsChanged(newVal) {
      this.inputs = newVal;
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
@import "../components/commonVariables";
#armut-demo-wrapper {
  max-width: unset !important;
}
</style>
