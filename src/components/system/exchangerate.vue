<template>
    <div>
      <div class="w-auto p-2" style="background-color: #e1f2df">汇率查询</div>
  
      <div class="row m-3">
        <div class="col-auto">
          <label for="account" class="col-form-label">1</label>
        </div>
  
        <div class="col-2">
          <select class="form-select w-65" aria-label="Default">
            <option selected>美金</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
  
        <div class="col-auto">
          <label for="account" class="col-form-label">25</label>
        </div>
  
        <div class="col-2">
          <select class="form-select w-65" aria-label="Default">
            <option selected>人民币</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
  
        <div class="row m-3">
          <div class="col-auto">
            <label for="account" class="col-form-label"> 等于</label>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-secondary">刷新</button>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import Multiselect from "@vueform/multiselect";
  
  export default {
    name: "AddEmployee",
    components: {
      EasyDataTable: window["vue3-easy-data-table"],
      Multiselect,
    },
    props: {
      visible: Boolean,
    },
  
    data() {
      return {
        accChangeValue: null,
        headers: [
          { text: "时间", value: "player", sortable: true },
          { text: "筹码币种", value: "team", sortable: true },
          { text: "上下数", value: "number", sortable: true },
          { text: "转码量", value: "position", sortable: true },
        ],
        items: [
          {
            player: "Stephen Curry",
            team: "GSW",
            number: 30,
            position: "G",
            indicator: { height: "6-2", weight: 185 },
            lastAttended: "Davidson",
            country: "USA",
          },
          {
            player: "Lebron James",
            team: "LAL",
            number: 6,
            position: "F",
            indicator: { height: "6-9", weight: 250 },
            lastAttended: "St. Vincent-St. Mary HS (OH)",
            country: "USA",
          },
          {
            player: "Kevin Durant",
            team: "BKN",
            number: 7,
            position: "F",
            indicator: { height: "6-10", weight: 240 },
            lastAttended: "Texas-Austin",
            country: "USA",
          },
          {
            player: "Giannis Antetokounmpo",
            team: "MIL",
            number: 34,
            position: "F",
            indicator: { height: "6-11", weight: 242 },
            lastAttended: "Filathlitikos",
            country: "Greece",
          },
        ],
      };
    },
    methods: {},
    watch: {},
  };
  </script>
  
  <style scoped>
  .form-group.required .control-label:after {
    content: "*";
    color: red;
  }
  </style>
  
  <style src="@vueform/multiselect/themes/default.css"></style>
  