<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">银头报表</div>

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
        <label for="account" class="col-form-label">操作类型</label>
      </div>

      <div class="col-2">
        <!-- <Multiselect
          v-model="type"
          mode="multiple"
          :close-on-select="false"
          :options="[
            { value: '0', label: '资金' },
            { value: '1', label: '游戏' },
            { value: '2', label: '客户' },
            { value: '3', label: '码粮' },
            { value: '4', label: '占成' },
            { value: '5', label: '交收' },
          ]"
        /> -->
        <select class="form-select w-65" aria-label="Default" v-model="type">
          <option
            v-for="option in typeList"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
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
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="callBankList()"
          >
            查询
          </button>
        </div>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="bankList">
      <template #item-type="{ type }">
        <p v-if="type == 1">资金</p>
        <p v-else-if="type == 2">游戏</p>
        <p v-else-if="type == 3">客户</p>
        <p v-else-if="type == 4">码粮</p>
        <p v-else-if="type == 5">占成</p>
        <p v-else-if="type == 6">交收</p>
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
      <template #item-create_time="{ create_time }">
        <p>{{ changeTimetoString(create_time)  }}</p>
      </template>
    </EasyDataTable>
    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { getBankList, getCurRoomList } from "../../network/api";
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
      room_id: 0,
      timeSelected: "",
      start_time: new Date().toISOString().slice(0, 10),
      end_time: new Date().toISOString().slice(0, 10),
      currency: 0,
      type: 0,
      bankList: [],

      currencyList: [],
      roomList: [],
      typeList: [
        { id: 0, text: "全部" },
        { id: 1, text: "资金" },
        { id: 2, text: "游戏" },
        { id: 3, text: "客户" },
        { id: 4, text: "码粮" },
        { id: 5, text: "占成" },
        { id: 6, text: "交收" },
      ],

      headers: [
        { text: "时间", value: "create_time", sortable: true },
        { text: "货币类型", value: "currency_name", sortable: true },
        { text: "操作类型", value: "type", sortable: true },
        { text: "现金", value: "money", sortable: true },
        { text: "存款额度", value: "deposit_amount", sortable: true },
        { text: "Marker额度", value: "marker_amount", sortable: true },
        { text: "现金码", value: "cash_code", sortable: true },
        { text: "泥码", value: "mud_code", sortable: true },
        { text: "码粮", value: "commission", sortable: true },
        { text: "占成", value: "gambling", sortable: true },
        { text: "客户帐号", value: "account", sortable: true },
        { text: "提案编号", value: "proposal_id", sortable: true },
        { text: "Marker 单号", value: "marker_order", sortable: true },
      ],
    };
  },

  async mounted() {
    this.callBankList();
    this.callCurRoomList();
  },
  methods: {
    callBankList() {
      getBankList(
        new Date(this.start_time).getTime() / 1000,
        new Date(this.end_time).getTime() / 1000,
        1,
        10,
        this.room_id,
        this.currency,
        this.type
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.bankList = result;
      });
    },

    changeTimetoString : function (time) {
      return moment(time).format("YYYY-MM-DD hh:mm:ss");
    },
    

    callCurRoomList() {
      getCurRoomList().then((res) => {
        console.log(res);
        const curResult = res.data.data.currency;
        this.currencyList = curResult;
        this.currencyList.push({ id: 0, currency_name: "全部" });

        const roomResult = res.data.data.room;
        this.roomList = roomResult;
        this.roomList.push({ id: 0, name: "全部" });
      });
    },
  },
  watch: {},
  // filters: {
  //   moment: function(date) {
  //     return moment(date).format("YYYY-MM-DD hh:mm:ss")
  //   }
  // }
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
