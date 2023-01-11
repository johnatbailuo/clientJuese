<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">围数报表</div>

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

      <!-- <div class="col-auto">
        <label for="account" class="col-form-label" >时间类型</label>
      </div>

      <div class="col-2">
        <select class="form-select w-65" aria-label="Default" v-model="timeSelected">
          <option
          v-for="option in timeOptions"
          :value="option.id"
          :key="option.id"
        >
          {{ option.text }}
        </option>
        </select>
      </div> -->

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

        <div class="col-auto ms-auto">
          <button type="button" class="btn btn-outline-secondary"
           @click="callPerimeterList()"
          >查询</button>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="perimeterList">
      <template #item-operation>
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="ProxyOpenCloseFun()"
          >
            重新发送
          </button>
        </div>
      </template>
      <template #item-time="{time}">
        <p> {{ changeTimetoString(time)}}</p>   
      </template>
    </EasyDataTable>
    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { getPerimeterList,getCurRoomList } from "../../network/api";
import moment from 'moment'

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
      vipSelected:"",
      timeSelected:"",
      start_time: new Date().toISOString().slice(0, 10),
      end_time:  new Date().toISOString().slice(0, 10),
      room_id:0,
      perimeterList: [],
      roomList:[],
    
      headers: [
        { text: "时间", value: "time", sortable: true },
        { text: "筹码币种", value: "currency_name", sortable: true },
        { text: "上下数", value: "profit", sortable: true },
        { text: "转码量", value: "transcode_amount", sortable: true },
      ],
    };
  },

  async mounted() {
    this.callPerimeterList();
    this.callCurRoomList();
  },

  methods: {
    callPerimeterList(){
      getPerimeterList(   
        (new Date(this.start_time).getTime())/1000,
        (new Date(this.end_time).getTime())/1000,
        this.room_id
        ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.perimeterList = result;
      })
    },

    changeTimetoString(time){
      return moment(time).format('MMMM DD YYYY')
    },

    callCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const roomResult = res.data.data.room;
        this.roomList = roomResult;
        this.roomList.push({id:0,name:"全部"})

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
