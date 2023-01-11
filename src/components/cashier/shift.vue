<template>
    <div>
      <div class="w-auto p-2" style="background-color: #e1f2df">交班</div>
      <div class="row m-3">
        <div class="col-auto">
            <label for="account" class="col-form-label">贵宾厅</label>
        </div>
        <div class="col-2">
          <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="room_id"
                >
                  <option
                    v-for="option in roomList"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </select>
        </div>
  
        <div class="col-auto ms-auto">
          <button
            type="button"
            class="btn btn-outline-secondary me-1"
            @click="AddNewOpenCloseFun()"
          >
            刷新
          </button>
        </div>
      </div>
  
      <EasyDataTable :headers="headers" :items="items">
      </EasyDataTable>
    </div>

  </template>
  
  <script>
  import { getCurRoomList } from "../../network/api";

  export default {
    name: "AddEmployee",
    components: {
      EasyDataTable: window["vue3-easy-data-table"],
    },
    props: {
      visible: Boolean,
    },
  
    data() {
      return {
        AddNewOpenClose: this.visible,
        BanOpenClose: this.visible,
        fastOpenClose: this.visible,

        roomList:[],
  
        headers: [
          { text: "现金", value: "player", sortable: true },
          { text: "存款占额", value: "team", sortable: true },
          { text: "Marker占额", value: "number", sortable: true },
          { text: "泥码数量", value: "position", sortable: true },
          { text: "现金码数量", value: "position", sortable: true },
          { text: "码粮", value: "position", sortable: true },
          { text: "占成", value: "position", sortable: true },
          { text: "有效资产", value: "position", sortable: true },
          { text: "代收金额", value: "position", sortable: true },
          { text: "换汇", value: "position", sortable: true },
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

    async mounted() {
     this.callCurRoomList();
  },

 

    methods: {
      AddNewOpenCloseFun() {
        this.AddNewOpenClose = !this.AddNewOpenClose;
      },
      BanOpenCloseFun() {
        this.BanOpenClose = !this.BanOpenClose;
      },
      fastOpenCloseFun() {
        this.fastOpenClose = !this.fastOpenClose;
      },
      callCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.room;
        this.roomList = curResult;
      })
    },

    },
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
  