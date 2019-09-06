<template>
  <v-layout row align-center justify-space-between class="demo-inputs">
    <v-flex xs2>
      <v-layout row align-center justify-space-between>
        <v-flex shrink>
            <span class="input-label">
              Keyword:
            </span>
        </v-flex>
        <v-flex shrink>
          <v-text-field v-model="inputs.query"
                        solo flat class="text-input"
                        hide-details></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex shrink>
      <v-layout row align-center justify-space-between>
        <v-flex shrink>
            <span class="input-label">
              Country:
            </span>
        </v-flex>
        <v-flex shrink>
          <v-select v-model="inputs.countryLang"
                    :items="data.countries"
                    placeholder="Country"
                    solo flat class="select-input"
                    hide-details></v-select>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex shrink>
      <v-layout row align-center justify-space-between>
        <v-flex shrink>
            <span class="input-label">
              Operator:
            </span>
        </v-flex>
        <v-flex shrink>
          <v-select v-model="inputs.operator"
                    :items="data.operators"
                    placeholder="Operator"
                    solo flat class="select-input"
                    hide-details></v-select>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex v-bind:class="{'xs4': operatorIsBetween, 'xs2': !operatorIsBetween }">
      <v-layout row align-center justify-space-between>
        <v-flex shrink>
            <span class="input-label">
              Ex. 1:
            </span>
        </v-flex>
        <v-flex shrink>
          <v-text-field v-model="inputs.expression1"
                        solo flat class="text-input"
                        hide-details></v-text-field>
        </v-flex>
        <template v-if="operatorIsBetween">
          <v-flex shrink>
            <span class="input-label">
              Ex. 2:
            </span>
          </v-flex>
          <v-flex shrink>
            <v-text-field v-model="inputs.expression2"
                          solo flat class="text-input"
                          hide-details></v-text-field>
          </v-flex>
        </template>
      </v-layout>
    </v-flex>

    <v-flex shrink>
      <v-btn flat class="search-button text-none" @click="searchClicked">
        <v-icon>search</v-icon>
        <span class="button-text">Search</span>
        <v-icon>arrow_right_alt</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "DemoInputs",
    data() {
      return {
        data: {
          countries: [
            { value: 'tr-tr', text: 'Turkey' },
            { value: 'eg-ar', text: 'Egypt' },
            { value: 'sa-ar', text: 'Saudi Arabia' },
            { value: 'ro-ro', text: 'Romania' },
            { value: 'gb-en', text: 'United Kingdom' }
          ],
          operators: [
            { value: 'between', text: 'Between' },
            { value: '<', text: 'Lower Than' },
            { value: '>', text: 'More Than' },
            { value: '=', text: 'Equals' }
          ]
        },
        inputs: {
          query: null,
          countryLang: null,
          expression1: null,
          expression2: null,
          operator: null,
        }
      }
    },
    computed: {
      operatorIsBetween() {
        return this.inputs.operator === 'between';
      }
    },
    watch:{
      inputs: {
        handler: function (newVal) {
          const countryLang = newVal.countryLang
              ? newVal.countryLang.split('-')
              : ['', ''];
          const expression = [Number(newVal.expression1)];
          if(this.operatorIsBetween) {
            expression.push(Number(newVal.expression2));
          }
          const obj = {
            query: newVal.query,
            expression: expression,
            operator: newVal.operator,
            country: countryLang[0],
            lang: countryLang[1]
          };
          this.$emit('inputs-changed', obj);
        },
        deep: true
      }
    },
    methods: {
      searchClicked() {
        this.$emit('search-clicked');
      }
    }
  }
</script>

<style lang="scss">
@import "../components/commonVariables";

$select-height: 36px;
$toolbar-title-color: #2C2B33;

.demo-inputs {
  padding-top: 10px;
  .text-input {
    @include default-input-style(36px);
  }
  .input-label {
    white-space: nowrap;
  }
  .select-input {
    background: $white;
    min-height: $select-height;
    height: unset;
    @include border-creator($input-border-color, 4px, true);
    @include default-select-template(true, false, 14px, 20px, $toolbar-title-color);
    margin-right: 24px;
    .v-input__control {
      min-height: $select-height;
      .v-input__slot {
        min-height: $select-height;
        box-shadow: none !important;
      }
    }
  }
  .search-button {
    @include button-creator(inherit, 4px, 16px, 21px, normal, rgba(0,0,0,.87), 36px);
    @include border-creator($input-border-color);
    margin: 0;
    .v-btn__content {
      @include input-icon-color(rgba(0,0,0,.54));
      .button-text {
        padding: 0 4px;
      }
    }
  }
}
</style>
