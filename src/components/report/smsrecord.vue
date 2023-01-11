<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">短信发送记录</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">账号</label>
      </div>

      <div class="col-auto">
        <input type="text" class="form-control" id="inputAccount" v-model="account" />
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">提案编号</label>
      </div>

      <div class="col-auto">
        <input type="text" class="form-control" id="inputAccount" v-model="proposal_id"/>
      </div>
      <div class="col-auto">
        <label for="account" class="col-form-label">Marker单号</label>
      </div>

      <div class="col-auto">
        <input type="text" class="form-control" id="inputAccount" v-model="marker_order" />
      </div>
      <div class="col-auto">
        <label for="account" class="col-form-label">状态</label>
      </div>
      <div class="col-2">
        <!-- <Multiselect
          v-model="status"
          mode="multiple"
          :close-on-select="false"
          :options="[
            { value: '0', label: '全部' },
            { value: '1', label: '传送中' },
            { value: '2', label: '传送成功' },
            { value: '3', label: '传送失败' },
          ]"
        /> -->

        <select
        class="form-select"
        aria-label="Default"
        v-model="status"
      >
        <option
          v-for="option in statusList"
          :value="option.id"
          :key="option.id"
        >
          {{ option.text }}
        </option>
      </select>
      </div>
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
        @click="smsList()">查询</button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="SMSList">
      <template #item-send_time="{send_time}">
        <span> {{ changeTimetoString(send_time)}}</span>   
      </template>
      <template #item-status="{status}">
        <span v-if="status	==1"> 传送中</span>
        <span v-else-if="status==2">传送成功</span>
        <span v-else-if="status==3">传送失败</span>
      </template>
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
    </EasyDataTable>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import {getSmsList} from "../../network/api";
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
      account:"",
      accChangeValue: null,
      proposal_id: "",
      marker_order:"",
      status:1,
      start_time:new Date().toISOString().slice(0, 10),
      end_time:new Date().toISOString().slice(0, 10),
      SMSList:[],
      statusList:[
        
            { id: 0, text: '全部' },
            { id: 1, text: '传送中' },
            { id: 2, text: '传送成功' },
            { id: 3, text: '传送失败' },
          
      ],

      headers: [
        { text: "发送时间", value: "send_time", sortable: true },
        { text: "客户账号", value: "account", sortable: true },
        { text: "提案编号", value: "proposal_id", sortable: true },
        { text: "Marker 单号", value: "marker_order", sortable: true },
        { text: "发送次数", value: "number", sortable: true },
        { text: "发送状态", value: "status", sortable: true },
        { text: "发送号码", value: "phone", sortable: true },
        { text: "", value: "operation", sortable: true },
        { text: "短信内容", value: "message", sortable: true },
      ],
     
    };
  },

  async mounted() {
   await this.smsList();
  },

  methods: {
    smsList(){
      getSmsList(
        (new Date(this.start_time).getTime())/1000,
        (new Date(this.end_time).getTime())/1000,
        1,
        10,
        this.account,
        this.proposal_id,
        this.marker_order,
        this.status
        ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.SMSList = result;
      })
    },
    changeTimetoString(time){
      console.log(time)
      return moment(time*1000).format('YYYY-MM-DD hh:mm:ss')
    }
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
