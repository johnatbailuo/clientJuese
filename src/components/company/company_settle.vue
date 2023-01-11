<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">公司交收</div>
    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>
      <div class="col-auto">
        <select
          class="form-select w-65"
          aria-label="Default"
          v-model="vproomSelected"
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

      <div class="col-auto">
        <label for="account" class="col-form-label">货币类型</label>
      </div>
      <div class="col-2">
        <select
          class="form-select"
          aria-label="Default"
          v-model="currencySelected"
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
      <div class="col-2">
        <select class="form-select" aria-label="Default" v-model="typeSelected">
          <option
            v-for="option in typeOption"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <div class="col-auto">
        <label for="account" class="col-form-label">状态</label>
      </div>
      <div class="col-2">
        <select
          class="form-select"
          aria-label="Default"
          v-model="statusSelected"
        >
          <option
            v-for="option in statusOption"
            :value="option.id"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

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
            v-model="startDate"
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
            v-model="endDate"
            class="form-control"
          />
        </div>
      </div>
      <div class="col-auto"></div>
      <!-- <div class="col-auto">
        <button type="button" class="btn btn-outline-secondary">昨天</button>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-secondary">上一周</button>
      </div>

      <div class="col-auto">
        <button type="button" class="btn btn-outline-secondary">当月</button>
      </div>

      <div class="col-auto">
        <button type="button" class="btn btn-outline-secondary">上个月</button>
      </div> -->
    </div>

    <EasyDataTable :headers="headers" :items="settleList" >
      <template #item-currency="{currency}">
        <span v-if="currency==1"> 人民币</span>
        <span v-else-if="currency==2">美元</span>
        <span v-else-if="currency==3">港币</span>
        <span v-else-if="currency==4">菲币</span>
      </template>
      <template #item-time="{time}">
        <span> {{changeTimetoString(time)}}</span>
      </template>
    </EasyDataTable>
    
  <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>
</template>

<script>
import { getCompanySettle,getCurRoomList } from "../../network/api";
import moment from 'moment'

export default {
  name: "AddEmployee",
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
  },
  props: {},

  data() {
    return {
      settleList: [],
      vproomSelected: 0,
      currencySelected: 0,
      typeSelected: 0,
      statusSelected: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),

      currencyList: [],
      roomList: [],
      
      typeOption: [
        { text: "全部", id: 0 },
        { text: "日结", id: 1 },
        { text: "月结", id: 2 },
      ],
      statusOption: [
        { text: "全部", id: 0 },
        { text: "未交收", id: 1 },
        { text: "已交收", id: 2 },
      ],

      headers: [
        { text: "时间", value: "time", sortable: true },
        { text: "货币类型", value: "currency", sortable: true },
        { text: "上下数", value: "profit", sortable: true },
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
      // this.startDate = this.startDate.replace(/-/g, "");
      // this.endDate = this.endDate.replace(/-/g, "");
      // this.startDate = parseInt( this.startDate);
      // this.endDate = parseInt(this.endDate);
    
       console.log('this.startDate',(new Date(this.startDate).getTime())/1000)
       getCompanySettle(
        this.vproomSelected,
        this.currencySelected,
        this.typeSelected,
        this.statusSelected,
        (new Date(this.startDate).getTime())/1000,
        (new Date(this.endDate).getTime())/1000
      ).then((res) => {
        console.log(res);
        const result = res.data.data.data;
        this.settleList = result;
      });
    },

    changeTimetoString(time){
      return moment(time*1000).format('YYYY-MM-DD hh:mm:ss')
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
