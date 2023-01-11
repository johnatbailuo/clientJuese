<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">交班报表</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>

      <div class="col-2">
        <select class="form-select w-65" aria-label="Default" v-model="room_id">
          <option
            v-for="option in roomList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="row m-3">
        <div class="col-auto">
          <label for="account" class="col-form-label">时间</label>
        </div>
        <div class="col-md-4 row">
          <div
            class="md-form md-outline input-with-post-icon datepicker col-md-4"
          >
            <input
              placeholder="Select date"
              type="date"
              id="example"
              v-model="start_time"
              class="form-control"
            />
          </div>
          <span class="col-1">~</span>
          <div
            class="md-form md-outline input-with-post-icon datepicker col-md-4"
          >
            <input
              placeholder="Select date"
              type="date"
              id="example"
              v-model="end_time"
              class="form-control"
            />
          </div>
        </div>

        <!-- <div class="col-auto">
          <button type="button" class="btn btn-outline-secondary">当天</button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-outline-secondary">
            最近一周
          </button>
        </div>

        <div class="col-auto">
          <button type="button" class="btn btn-outline-secondary">
            最近一个月
          </button>
        </div> -->

        <div class="col-auto ms-auto">
          <button type="button" class="btn btn-outline-secondary"
          @click="callShiftList()"
          >查询</button>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="shiftList">
      <template #item-time="{ time }">
        <span>{{ changeTimetoString(time) }}</span>
      </template>
    </EasyDataTable>
    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { getShiftList, getCurRoomList } from "../../network/api";
import moment from "moment";

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
      roomList: [],
      room_id: 0,
      start_time: new Date().toISOString().slice(0, 10),
      end_time: new Date().toISOString().slice(0, 10),
      shiftList: [],

      headers: [
        { text: "时间", value: "time", sortable: true },
        { text: "交班人", value: "admin_name", sortable: true },
        { text: "菲币现金", value: "php_cash", sortable: true },
        { text: "菲币存款", value: "php_deposit", sortable: true },
        { text: "菲币 Marker", value: "php_marker", sortable: true },
        { text: "菲币现金码", value: "php_cash_code", sortable: true },
        { text: "菲币泥码", value: "php_mud_code", sortable: true },
        { text: "菲币占成", value: "php_gambling", sortable: true },
        { text: "备注", value: "reamark", sortable: true },
      ],
    };
  },

  async mounted() {
    this.callShiftList();
    this.callCurRoomList();
  },

  methods: {
    callShiftList() {
      getShiftList(
        new Date(this.start_time).getTime() / 1000,
        new Date(this.end_time).getTime() / 1000,
        1,
        10,
        this.room_id
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.shiftList = result;
      });
    },

    changeTimetoString(time) {
      return moment(time*1000).format('YYYY-MM-DD hh:mm:ss')
    },

    callCurRoomList() {
      getCurRoomList().then((res) => {
        console.log(res);
        const roomResult = res.data.data.room;
        this.roomList = roomResult;
        this.roomList.push({ id: 0, name: "全部" });
      });
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
