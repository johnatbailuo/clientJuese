<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">操作曰志</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">账号</label>
      </div>

      <div class="col-auto">
        <input type="email" class="form-control" id="inputAccount"  v-model="account" />
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>

      <div class="col-2">
        <!-- <Multiselect
          v-model="room_id"
          mode="multiple"
          :close-on-select="false"
          :options="[
            { value: 0, label: '全部' },
            { value: 1, label: 'SOLAIRE_FAST' },
          ]"
        /> -->
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
            class="md-form md-outline input-with-post-icon datepicker col-md-5"
          >
            <input
              placeholder="Select date"
              type="date"
              id="example"
              v-model="start_date"
              class="form-control"
            />
          </div>
          <span class="col-1">~</span>
          <div
            class="md-form md-outline input-with-post-icon datepicker col-md-5"
          >
            <input
              placeholder="Select date"
              type="date"
              id="example"
              v-model="end_date"
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
          @click="callLogList()"
          >查询</button>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="logList">
      <template #item-time="{time}">
        <span> {{ changeTimetoString(time)}}</span>   
      </template>
    </EasyDataTable>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import {getLogList,getCurRoomList} from "../../network/api";
import moment from 'moment';

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
      start_date:new Date().toISOString().slice(0, 10),
      end_date:new Date().toISOString().slice(0, 10),
      type:0,
      account:"",
      roomList:[],
      room_id:0,
      logList:[],

      accChangeValue: null,
      headers: [
        { text: "时间", value: "time", sortable: true },
        { text: "员工", value: "admin_name", sortable: true },
        { text: "动作", value: "type_name", sortable: true },
        { text: "IP", value: "opter_ip", sortable: true },
        { text: "备注", value: "remark", sortable: true },
        { text: "", value: "position", sortable: true },
      ],
  
    };
  },
  async mounted() {
    this.callLogList();
    this.callCurRoomList();
  },

  methods: {
    callLogList(){
      getLogList(
        (new Date(this.start_date).getTime())/1000,
        (new Date(this.end_date).getTime())/1000,
        this.type,
        1,
        10,
        this.account,
        this.room_id,
      
        ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.logList = result;
      })
    },

    changeTimetoString(time){
      console.log(time)
      return moment(time*1000).format('YYYY-MM-DD hh:mm:ss')
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
