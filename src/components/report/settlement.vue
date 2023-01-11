<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">结算</div>

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

      <div class="col-auto">
        <label for="account" class="col-form-label">货币类型</label>
      </div>

      <div class="col-2">
        <select
          class="form-select w-65"
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
        <label for="account" class="col-form-label">类型</label>
      </div>

      <div class="col-3">
        <div class="col-3">
          <select
            class="form-select w-65"
            aria-label="Default"
            v-model="type"
          >
            <option
              v-for="option in typeOptions"
              :value="option.id"
              :key="option.id"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">状态</label>
      </div>

      <div class="col-2">
        <select
          class="form-select w-65"
          aria-label="Default"
          v-model="status"
        >
          <option
            v-for="option in statusOptions"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
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
          <button type="button" class="btn btn-outline-secondary">昨天</button>
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-outline-secondary">
            上一周
          </button>
        </div>

        <div class="col-auto">
          <button type="button" class="btn btn-outline-secondary">当月</button>
        </div>

        <div class="col-auto">
          <button type="button" class="btn btn-outline-secondary">
            上个月
          </button>
        </div> -->

        <div class="col-auto ms-auto">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="callSettleList()"
          >
            查询
          </button>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="exchangeList">
      <template #item-currency="{currency}">
        <p v-if="currency==1"> 人民币</p>
        <p v-else-if="currency==2">美元</p>
        <p v-else-if="currency==3">港币</p>
        <p v-else-if="currency==4">菲币</p>
      </template>
      <template #item-create_time="{create_time}">
        <p> {{ changeTimetoString(create_time)}}</p>   
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
import { getSettleList,getCurRoomList } from "../../network/api";
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
      account: "",
      currency: 0,
      start_time: new Date().toISOString().slice(0, 10),
      end_time: new Date().toISOString().slice(0, 10),
      room_id: 0,
      type: 0,
      status: 0,
      exchangeList: [],

      roomList: [],
      statusOptions: [
        { id: 0, text: "全部" },
        { id: 1, text: "未交收" },
        { id: 2, text: "已交收" },
      ],
      typeOptions: [
        { id: 0, text: "全部" },
        { id: 1, text: "日结" },
        { id: 2, text: "月结" },
      ],
      currencyList: [],

      headers: [
        { text: "时间", value: "create_time", sortable: true },
        { text: "货币类型", value: "currency", sortable: true },
        { text: "上下数", value: "count_up_down", sortable: true },
        { text: "码粮", value: "commission", sortable: true },
        { text: "占成", value: "gambling", sortable: true },
      ],
    };
  },

  async mounted() {
     this.callSettleList();
     this.callCurRoomList();
  },

  methods: {
    callSettleList() {
      getSettleList(
        (new Date(this.start_time).getTime())/1000,
        (new Date(this.end_time).getTime())/1000,
        1,
        10,
        this.room_id,
        this.currency,
        this.type,
        this.status
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.exchangeList = result;
      });
    },

    changeTimetoString(time){
      return moment(time).format('MMMM DD YYYY')
    },

    callCurRoomList(){
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        this.currencyList.push({id:0,currency_name:"全部"})

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
