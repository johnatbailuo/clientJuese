<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">换汇记录</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">货币类型</label>
      </div>

      <div class="col-2">
        <!-- <Multiselect
          v-model="currency_type"
          mode="multiple"
          :close-on-select="false"
          :options="[
            { value: '0', label: '全部' },
            { value: '1', label: '菲币' },
            { value: '2', label: '人民币' },
            { value: '3', label: '港币' },
            { value: '4', label: '美金' },
          ]"
        /> -->

        <select
        class="form-select"
        aria-label="Default"
        v-model="currency"
      >
        <option
          v-for="option in currencyList"
          :value="option.id"
          :key="option.id"
        >
          {{ option.currency_name }}
        </option>
      </select>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">客户账号</label>
      </div>

      <div class="col-auto">
        <input type="email" class="form-control" id="inputAccount"  v-model="account" />
      </div>

      <div class="row m-3">
        <div class="col-auto">
          <label for="account" class="col-form-label">换汇时间</label>
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
           @click="callExchangeList()"
          >查询</button>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="exchangeList">
      <template #item-from_currency="{from_currency}">
        <p v-if="from_currency==1"> 人民币</p>
        <p v-else-if="from_currency==2">美元</p>
        <p v-else-if="from_currency==3">港币</p>
        <p v-else-if="from_currency==4">菲币</p>
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
    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import {getExchangeList,getCurRoomList} from "../../network/api";

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
      account:"",
      currency:0,
      start_time: new Date().toISOString().slice(0, 10),
      end_time: new Date().toISOString().slice(0, 10),
      exchangeList:[],

      currencyList:[],

      headers: [
        { text: "户口", value: "account", sortable: true },
        { text: "贵宾厅", value: "room_name", sortable: true },
        { text: "操作人员", value: "admin_name", sortable: true },
        { text: "换汇时间", value: "time", sortable: true },
        { text: "卖出币种", value: "from_currency", sortable: true },
        { text: "卖出数量", value: "from_amount", sortable: true },
        { text: "买人币种", value: "to_currency_name", sortable: true },
        { text: "买人数量", value: "to_amount", sortable: true },
        { text: "实际汇率", value: "exchange_rate", sortable: true },
        { text: "原始汇率", value: "original_exchange", sortable: true },
        { text: "备注", value: "remark", sortable: true },
      ],
    };
  },

  async mounted() {
    this.callExchangeList();
    this.callCurRoomList();
  },

  methods: {
    callExchangeList(){
      getExchangeList(
        (new Date(this.start_time).getTime())/1000,
        (new Date(this.end_time).getTime())/1000,
        1,
        10,
        this.account,
        this.currency,  
        ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.exchangeList = result;
      })
    },
    callCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        this.currencyList.push({id:0,currency_name:"全部"})

        // const roomResult = res.data.data.room;
        // this.roomList = roomResult;
      })
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
