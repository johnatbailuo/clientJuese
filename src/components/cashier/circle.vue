<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">围数</div>
    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">贵宾厅</label>
      </div>
      <div class="col-auto">
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
        <label for="account" class="col-form-label">最后围数时间</label>
      </div>
      <p class="col-auto py-1">2021-12-29 11:24</p>
      <div class="col-auto ms-auto">
        <button
          type="button"
          class="btn btn-outline-secondary me-2"
          @click="CircleOpenCloseFun()"
        >
          围数
        </button>
        <button type="button" class="btn btn-outline-secondary">
          提案围数
        </button>
      </div>
    </div>

    <EasyDataTable :headers="headers" :items="items">
      <template #item-operation>
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="PcOpenCloseFun()"
          >
            围数
          </button>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <div
    v-if="CircleOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 3%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            围数
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">开工币种</label>
              </div>
              <div class="col-3 mt-1">
                <p>转码量</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">菲币</label>
              </div>
              <div class="col-3 mt-1">
                <p>11,384万</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">人民币</label>
              </div>
              <div class="col-3 mt-1">
                <p>25万</p>
              </div>
            </div>
            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">总转码量</label>
              </div>
              <div class="col-3 mt-1">
                <p>11,384万</p>
              </div>
            </div>

            <EasyDataTable :headers="proposalHeaders" :items="proposalItems" />
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="CircleOpenCloseFun()"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="PcOpenClose"
    class="modal fade show"
    tabindex="-1"
    style="display: block; left: 3%; top: 3%"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 w-100 p2 text-center"
            id="exampleModalLabel"
            style="background-color: #91bad6"
          >
            提案围数
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">客户账号</label>
              </div>
              <div class="col-3 mt-1">
                <p>YQ0127</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">客户名称</label>
              </div>
              <div class="col-3 mt-1">
                <p>东</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">贵宾厅</label>
              </div>
              <div class="col-3 mt-1">
                <p>SOLAIRE</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">货币类型</label>
              </div>
              <div class="col-3 mt-1">
                <p>菲币</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">题案编号</label>
              </div>
              <div class="col-3 mt-1">
                <p>413</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">总转码量</label>
              </div>
              <div class="col-3 mt-1">
                <p>11,384万</p>
              </div>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">泥码</label>
              </div>
              <div class="col-3 mt-1">
                <p>泥码</p>
              </div>
              <div class="col-3">
                <input
                type="email"
                class="form-control"
                id="inputAccount"
                placeholder="密码确认"
              />

              </div>
              <span class="col-1 mt-1">万</span>
            </div>

            <div class="form-row row">
              <div class="col-2">
                <label for="account" class="col-form-label">现金码</label>
              </div>
              <div class="col-3 mt-1">
                <p>现金码</p>
              </div>
              <div class="col-3">
                <input
                type="email"
                class="form-control"
                id="inputAccount"
                placeholder="密码确认"
              />

              </div>
              <span class="col-1 mt-1">万</span>
            </div>


          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="PcOpenCloseFun()"
          >
         确定
         </button>
          <button
            class="btn btn-primary d-flex text-center justify-content-center"
            type="button"
            @click="PcOpenCloseFun()"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurRoomList}  from "../../network/api";

export default {
  name: "parameter",
  components: {
    EasyDataTable: window["vue3-easy-data-table"],
  },
  props: {
    visible: Boolean,
  },

  data() {
    return {
      CircleOpenClose: this.visible,
      PcOpenClose: this.visible,

      roomList:[],

      headers: [
        { text: "客户账号", value: "userAccount", sortable: true },
        { text: "提案编号", value: "proposalAccount", sortable: true },
        { text: "提案类型", value: "proposalCategory", sortable: true },
        { text: "状态", value: "status", sortable: true },
        { text: "开工币种", value: "startCurrency", sortable: true },
        { text: "筹码种类", value: "chipType", sortable: true },
        { text: "开工总额", value: "totalConstruct", sortable: true },
        { text: "占成比", value: "proportion", sortable: true },
        { text: "转码比", value: "transcode", sortable: true },
        { text: "转码量", value: "transcode_amt", sortable: true },
        { text: "占成", value: "accounted", sortable: true },
        { text: "码粮", value: "code", sortable: true },
        { text: "开工时间", value: "start_time", sortable: true },
        { text: "最后围数时间", value: "final_count", sortable: true },
        { text: "", value: "operation", sortable: true },
      ],
      items: [
        {
          userAccount: "YQ0127",
          proposalAccount: "413",
          proposalCategory: "现场开工",
          status: "未收工",
          startCurrency: "菲币",
          chipType: "泥码",
          totalConstruct: "1 万",
          proportion: "0%",
          transcode: "0%",
          transcode_amt: "1 万",
          accounted: "0",
          code:"0",
          start_time:"2022-12-09 15:26"
        },
        {
          userAccount: "YQ0127",
          proposalAccount: "413",
          proposalCategory: "现场开工",
          status: "未收工",
          startCurrency: "菲币",
          chipType: "泥码",
          totalConstruct: "1 万",
          proportion: "0%",
          transcode: "0%",
          transcode_amt: "1 万",
          accounted: "0",
          code:"0",
          start_time:"2022-12-09 15:26"
        },
        {
          userAccount: "YQ0127",
          proposalAccount: "413",
          proposalCategory: "现场开工",
          status: "未收工",
          startCurrency: "菲币",
          chipType: "泥码",
          totalConstruct: "1 万",
          proportion: "0%",
          transcode: "0%",
          transcode_amt: "1 万",
          accounted: "0",
          code:"0",
          start_time:"2022-12-09 15:26"
        },
      
      ],
      proposalHeaders: [
        { text: "提案编号", value: "name", sortable: true },
        { text: "贵宾厅", value: "account", sortable: true },
        { text: "币别", value: "pesoBalance", sortable: true },
        { text: "总转码", value: "rmbBalance", sortable: true },
        { text: "上下数", value: "hkdBalance", sortable: true },
        { text: "开工条件", value: "usdBalance", sortable: true },
        { text: "占成", value: "usdBalance", sortable: true },
        { text: "码粮", value: "usdBalance", sortable: true },
        { text: "结算金额", value: "usdBalance", sortable: true },
        { text: "开工时间", value: "usdBalance", sortable: true },
        { text: "收工时间", value: "usdBalance", sortable: true },
      ],
      proposalItems: [
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
        {
          name: "11111111",
          account: "YQ13579",
          pesoBalance: "800万",
          rmbBalance: "0",
          hkdBalance: "0",
          usdBalance: "0",
        },
      ],
    };
  },

  async mounted() {
   this.callCurRoomList();
  },
  
  methods: {
    CircleOpenCloseFun() {
      this.CircleOpenClose = !this.CircleOpenClose;
    },
    PcOpenCloseFun() {
      this.PcOpenClose = !this.PcOpenClose;
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
  watch: {
    visible: function (newVal, oldVal) {
      this.CircleOpenClose = newVal;
    },
  },
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
