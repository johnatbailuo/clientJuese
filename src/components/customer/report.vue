<template>
  <div>
    <div class="w-auto p-2" style="background-color: #e1f2df">报表</div>

    <div class="row m-3">
      <div class="col-auto">
        <label for="account" class="col-form-label">账号</label>
      </div>
      <div class="col-auto">
        <input
          type="text"
          class="form-control"
          id="inputAccount"
          placeholder="账号"
          v-model="account"
        />
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
        <label for="account" class="col-form-label">账变类型</label>
      </div>
      <div class="col-2">
        <!-- <Multiselect
          v-model="listType"
          mode="multiple"
          :close-on-select="false"
          :options="[
            { value: '0', label: '全部' },
            { value: '1', label: '存款' },
            { value: '2', label: '堤款' },
            { value: '3', label: '游戏' },
            { value: '4', label: '转账' },
            { value: '5', label: 'Marker' },
            { value: '6', label: '码粮' },
            { value: '7', label: '占成' },
          ]"
        /> -->

        <select
        class="form-select w-65"
        aria-label="Default"
        v-model="listType"
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

      <div class="col-auto ms-auto">
        <button type="button" class="btn btn-outline-secondary" @click="callAccountChangeList()">查询</button>
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
            class="form-control"
            v-model="start_date"
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
            class="form-control"
            v-model="end_date"
          />
        </div>
      </div>
      <div class="col-auto"></div>
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
    </div>

    <EasyDataTable 
    :headers="headers" 
    :items="accountChangesList"
    :rows-per-page="5"
    v-model:server-options="serverOptions"
    :server-items-length="serverItemsLength"
    >
      <template #item-currency_id="{currency_id}">
        <p v-if="currency_id==1"> 人民币</p>
        <p v-else-if="currency_id==2">美元</p>
        <p v-else-if="currency_id==3">港币</p>
        <p v-else-if="currency_id==4">菲币</p>
      </template>
      <template #item-time="{time}">
        <span> {{ changeTimetoString(time)}}</span>   
      </template>
      <template #item-operation>
        <div class="operation-wrapper">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="ProxyOpenCloseFun()"
          >
            打印小票
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="printOpenCloseFun()"
          >
            打印单据
          </button>
        </div>
      </template>

    </EasyDataTable>

    <button class="m-2 btn btn-outline-secondary">导出 Excel</button>
  </div>

  <div
    v-if="printOpenClose"
    class="modal fade show w-50"
    tabindex="-1"
    style="display: block; left: 25%; top: 10%"
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
            存款
          </h1>
        </div>
        <div class="modal-body">
          <form class="p-4">
            <div class="container">
              <div class="card">
                <div class="card-header">
                  日期 Date:2022-12-09 15:15
                  <strong>01/01/01/2018</strong>
                  <span class="float-right ms-5">
                    <strong>编号 No:</strong> 1981620</span
                  >
                </div>
                <div class="card-body">
                  <div class="row mb-0">
                    <div class="col-sm-12">
                      <div class="text-center">
                        <strong>收 据 OFFICIAL RECEIPT</strong>
                      </div>
                    </div>
                  </div>

                  <div class="table-responsive-sm">
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <td class="center">
                            <div>
                              <p class="m-0 p-0">姓名</p>
                              <p class="m-0 p-0">Name</p>
                            </div>
                          </td>
                          <td class="center strong text-left">
                            <p class="p-0 m-0">黄小姐</p>
                          </td>
                          <td class="center">
                            <div>
                              <p class="m-0 p-0">户口</p>
                              <p class="m-0 p-0">Account</p>
                            </div>
                          </td>

                          <td class="right">YQH11</td>
                        </tr>
                        <tr>
                          <td class="center">
                            <div>
                              <p class="m-0 p-0">类型</p>
                              <p class="m-0 p-0">Type</p>
                            </div>
                          </td>
                          <td class="center text-left">存款</td>
                          <td class="left">
                            <div>
                              <p class="m-0 p-0">币种</p>
                              <p class="m-0 p-0">Currency</p>
                            </div>
                          </td>

                          <td class="right">菲币</td>
                        </tr>
                        <tr>
                          <td class="center">
                            <div>
                              <p class="m-0 p-0">金额</p>
                              <p class="m-0 p-0">Total</p>
                            </div>
                          </td>
                          <td class="left text-left">肆百捌拾玖万柒千元整</td>

                          <td class="center"></td>
                          <td class="right"></td>
                        </tr>
                        <tr>
                          <td class="center">
                            <div>
                              <p class="m-0 p-0">$</p>
                            </div>
                          </td>
                          <td class="left text-left">489.7 万</td>
                          <td class="left"></td>

                          <td class="right"></td>
                        </tr>

                        <tr>
                          <td class="center">
                            <div>
                              <p class="m-0 p-0">备注</p>
                              <p class="m-0 p-0">Remark</p>
                            </div>
                          </td>
                          <td class="left text-left"></td>

                          <td class="center"></td>
                          <td class="right"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="row">
                    <div class="col-4 mt-5">
                      <p class="m-0 p-0">经办人签章</p>
                      <hr class="divider m-1 p-0 text-black" />
                      <hr class="divider m-0 p-0 text-black" />
                    </div>
                    <div class="col-3"></div>
                    <div class="col-5">
                      <p class="m-0 p-0">本收据包经办人签名或方为有效</p>
                      <p class="m-0 p-0">
                        This receipt must contain the valid signature or stamp
                        of the person in charge
                      </p>

                      <div class="row">
                        <div class="col-6">
                          <p class="m-0 p-0">联系电话</p>
                          <p>Contact number</p>
                        </div>
                        <div class="col-6">
                          <p class="m-0 p-0">+6399899999999</p>
                          <p>+6399899999999</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="row">
                  <div class="col-lg-4 col-sm-5"></div>

                  <div class="col-lg-4 col-sm-5 ml-auto">
                    <table class="table table-clear">
                      <tbody>
                        <tr>
                          <td class="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td class="right">$8.497,00</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Discount (20%)</strong>
                          </td>
                          <td class="right">$1,699,40</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>VAT (10%)</strong>
                          </td>
                          <td class="right">$679,76</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Total</strong>
                          </td>
                          <td class="right">
                            <strong>$7.477,36</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> -->
                </div>
              </div>
            </div>
          </form>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-danger d-flex justify-content-center"
            type="button"
            @click="printOpenCloseFun()"
          >
            关闭
          </button>
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
          >
            纯文字
          </button>
          <button
            class="btn btn-primary d-flex justify-content-center"
            type="button"
          >
            文字+底稿
          </button>
          <button
            class="btn btn-primary d-flex just
            ify-content-center"
            type="button"
          >
            纯底稿
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import {accountChangeList,getCurRoomList} from "../../network/api";
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
      accountChangesList: [],
      account: "",
      currencySelected: 0,
      listType: 0,
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      printOpenClose: this.visible,
      serverItemsLength:0,

      currencyList:[],

      typeOptions:[
            { id: '0', text: '全部' },
            { id: '1', text: '存款' },
            { id: '2', text: '堤款' },
            { id: '3', text: '游戏' },
            { id: '4', text: '转账' },
            { id: '5', text: 'Marker' },
            { id: '6', text: '码粮' },
            { id: '7', text: '占成' },
          ],

      serverOptions:{page:1,rowsPerpage:25},


      headers: [
        { text: "时间", value: "time", sortable: true },
        { text: "客户账号", value: "account", sortable: true },
        { text: "客户名称", value: "name", sortable: true },
        { text: "货币类型", value: "currency_id", sortable: true },
        { text: "账变类型", value: "type_name", sortable: true },
        { text: "变动前", value: "change_money", sortable: true },
        { text: "变动额", value: "balance", sortable: true },
        { text: "变动后(馀额)", value: "after_money", sortable: true },
        { text: "提案编号", value: "proposal_id", sortable: true },
        { text: "Marker 单号", value: "marker_id", sortable: true },
        { text: "", value: "operation", sortable: true },
        { text: "详情", value: "detail", sortable: true },
        { text: "备注", value: "remark", sortable: true },
      ],      
    };
  },

  async mounted() {
    this.callAccountChangeList();
    this.callCurRoomList();
  },
  methods: {
    printOpenCloseFun() {
      this.printOpenClose = !this.printOpenClose;
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
      })
    },


    callAccountChangeList() {
      // this.start_date = this.startDate.replace(/-/g, "");
      // this.end_date = this.endDate.replace(/-/g, "");
      // this.start_date = parseInt( this.startDate);
      // this.end_date = parseInt(this.endDate);
      accountChangeList(
        this.serverOptions.page,
        this.serverOptions.rowsPerpage,
        this.account,
        this.currencySelected,
        this.listType,
        (new Date(this.start_date).getTime())/1000,
        (new Date(this.end_date).getTime())/1000,
      ).then((res) => {
        const result = res.data.data.data;
        this.accountChangesList = result;
        this.serverItemsLength = res.data.total
        console.warn(result);
      });
    },
  },

  watch: {
    visible: function (newVal, oldVal) {
      this.printOpenClose = newVal;
    },
  },
};
</script>

<style scoped>
.form-group.required .control-label:after {
  content: "*";
  color: red;
}

table tr td {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
}
table {
  background: #fff none repeat scroll 0 0;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
}
table tr:nth-child(even) {
  background: #ccc;
}
table tr:nth-child(odd) {
  background: #eee;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
