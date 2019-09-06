<template>
  <div class="ag-grid-wrapper">
    <v-layout column>
      <v-flex xs11>
        <ag-grid-vue :gridOptions="gridOptions"
                     class="ag-theme-balham ag-grid-table"
                     style="height: 500px; width: 100%"
                     :columnDefs="columnDefs"
                     :defaultColDef="defaultColDef"
                     :rowData="computedTableData"
                     :animateRows="true"
                     :floatingFilter="false"
                     :pagination="true"
                     :onGridReady="onGridReady"
                     @modelUpdated="autoSizeColumns"
                     :paginationPageSize="paginationPageSize"
                     :suppressPaginationPanel="true"></ag-grid-vue>
      </v-flex>
      <v-flex xs1>
        <v-layout row class="ag-grid-footer" v-bind:class="{'with-info': footerInfoEnabled}">
          <template v-if="footerInfoEnabled">
            <v-flex shrink>
              <v-layout row align-center justify-space-between>
                <v-flex xs6 class="how-to-info">
                  <div class="info-icon">
                    <img :src="icons.infoIcon" alt="info">
                  </div>
                  <div class="info-text">How to use this table?</div>
                </v-flex>
                <v-flex xs6 class="case-study-info">
                  <div class="info-icon">
                    <img :src="icons.infoIcon" alt="info">
                  </div>
                  <div class="info-text">Case Study: Understand</div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-spacer></v-spacer>
          </template>
          <v-flex shrink>
            <v-layout row align-center justify-space-between>
              <v-flex class="pagination-size-container">
                <span class="pagination-size-text">Per Page:</span>
                <v-select :items="paginationSizes" :value="paginationPageSize"
                          class="pagination-size-select" solo flat
                          hide-details
                          @input="changePaginationSize"></v-select>
              </v-flex>
              <v-flex>
                <v-layout row align-center justify-space-between>
                  <v-flex shrink class="pagination-wrapper">
                    <v-btn flat class="pagination-button" @click="setCurrentPage('prev')">
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-text-field solo flat hide-details :value="currentPage"
                                  @input="setCurrentPage"
                                  class="pagination-page-input"></v-text-field>
                    <v-btn flat class="pagination-button" @click="setCurrentPage('next')">
                      <v-icon>chevron_right</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex shrink class="total-page-wrapper">
                    <div class="total-page-text">of {{totalPages}}</div>
                  </v-flex>
                </v-layout>
                <!--
                <v-pagination :total-visible="maxPageNumbers"
                              :value="currentPage" @input="setCurrentPage"
                              :length="totalPages"
                ></v-pagination>
                -->
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';
// AgGrid Enterprise
import 'ag-grid-enterprise';
import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey("Evaluation_License-_Not_For_Production_Valid_Until_5_July_2020__MTU5MzkwMzYwMDAwMA==6bf697bbf063b172b5ee7fa461fb49ae");

export default {
  name: "AgGrid",
  components: {
    AgGridVue
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    columnDefs: {
      type: Array,
      default() {
        return [];
      }
    },
    columnsShouldSize: {
      type: Boolean,
      default: false
    },
    rowModelType: {
      type: String,
      default: 'clientSide',
      validator(value) {
        return (
            ['clientSide', 'infinite', 'viewport', 'serverSide'].indexOf(value) > -1
        );
      },
    },
    dataSource: {
      type: Object,
      default() {
        return undefined;
      }
    },
    footerInfoEnabled: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icons: {
        infoIcon: require('../assets/icons/info_icon.svg')
      },
      paginationSizes: [
        10,
        20,
        50,
        100,
        150
      ],
      searchQuery: '',
      gridOptions: {
        deltaColumnMode: true,
        groupSuppressAutoColumn: true,
        suppressAggFuncInHeader: true,
        rowModelType: this.rowModelType,
        rowHeight: 44,
        headerHeight: 44
      },
      maxPageNumbers: 7,
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        editable: false,
        resizable: false,
        suppressMenu: true
      },
    };
  },
  computed: {
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 10;
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage() {
      if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
      else return 1;
    },
    computedTableData() {
      if (this.rowModelType === 'clientSide') {
        return this.tableData;
      }
      return undefined;
    },
    rowCount() {
      if (this.rowModelType === 'clientSide') {
        return this.tableData.length;
      } else {
        return this.dataSource.rowCount;
      }
    }
  },
  watch: {
    dataSource(newVal) {
      if(this.rowModelType === 'serverSide') {
        this.gridApi.setServerSideDatasource(newVal);
      }
    },
    loading(newVal) {
      if(newVal) {
        this.gridApi.showLoadingOverlay();
      } else if(this.tableData.length === 0) {
        this.gridApi.showNoRowsOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }
  },
  methods: {
    setCurrentPage(page) {
      if (page === 'prev') {
        if(this.currentPage !== 1) {
          this.gridApi.paginationGoToPreviousPage();
        }
      } else if (page === 'next') {
        if (this.totalPages !== this.currentPage) {
          this.gridApi.paginationGoToNextPage();
        }
      } else if (page !== '') {
        const pageNum = Number(page);
        if (pageNum <= this.totalPages && pageNum >= 1) {
          this.gridApi.paginationGoToPage(pageNum - 1);
        }
      }
    },
    changePaginationSize(val) {
      this.gridApi.paginationSetPageSize(val);
    },
    updateSearchQuery(val) {
      if (this.rowModelType === 'clientSide') {
        this.gridApi.setQuickFilter(val);
      }
    },
    onGridReady() {
      this.gridApi.sizeColumnsToFit();
    },
    autoSizeColumns() {
      if(this.rowCount > 0) {
        const colIds = this.columnApi.getAllColumns().map(x => {
          return x.colId;
        });
        this.columnApi.autoSizeColumns(colIds);
      } else {
        this.gridApi.sizeColumnsToFit();
      }
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.columnApi = this.gridOptions.columnApi;
  }
}
</script>

<style lang="scss">
  @import "./AgGrid";
</style>
